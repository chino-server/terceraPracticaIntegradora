import CartsManager from "../DAL/DAOs/cartsDaos/cartsManager.js";
import { ProductManager } from "../DAL/DAOs/productDaos/productsManager.js";
import { logger } from "../utils/winston.js";
import ticketsManager from "../DAL/DAOs/ticketsDaos/ticketsManager.js";

const carts = new CartsManager();
const productManager = new ProductManager();
const ticketManager = new ticketsManager()

export const addCartService = async () => {
  try {
    const cart = await carts.addCart();
    return cart;
  } catch (error) {
    console.log(error);
  }
};

export const getByIdService = async (id) => {
  try {
    const cart = await carts.getById(id);
    if (!cart) {
      throw new Error("Cart not found");
    }
    const total = cart.products
      .map((product) => product.pid.price * product.quantity)
      .reduce((a, b) => a + b, 0);
    const cartObj = cart.toObject();
    cartObj.total = total;
    logger.info({ "aqui total": cartObj.total });
    logger.info({ "Aqui algo": cart });
    return cartObj;
  } catch (error) {
    console.log(error);
  }
};

export const addProductToCartService = async (cartId, ProductId, quantity) => {
  try {
    const productToCart = await carts.addProductToCart(
      cartId,
      ProductId,
      quantity
    );

    return productToCart;
  } catch (error) {
    console.log(error);
  }
};

export const updateProductFromCart = async (cartId, product) => {
  try {
    const cart = await carts.getById(cartId);

    if (!cart) {
      throw new Error("Carrito no encontrado");
    }
    const productsPromises = product.map((p) =>
      productManager.findById({ _id: p.pid })
    );
    const foundProducts = await Promise.all(productsPromises);

    if (foundProducts.includes(null)) {
      throw new Error("Algunos productos no existen");
    }
    const newCart = await carts.updateAllProductFromCart(cartId, product);
    return newCart;
  } catch (error) {
    console.log(error);
  }
};

export const delCartServices = async (cartId) => {
  try {
    const cart = await carts.getById(cartId);
    if (!cart) {
      throw new Error("El carrito no existe");
    }
    const delOneCart = carts.deleteCart(cartId);
    return delOneCart;
  } catch (error) {
    console.log(error);
  }
};

export const purchaseCartService = async (carId) => {
  try {
    const cart = await carts.getById(carId);
    logger.info({ "Aqui cartService": cart });
    if (!cart) {
      throw new Error("Cart Not Found");
    }
    const productsToBuy = [];
    const productsNotPurchased = [];

    await Promise.all(
      cart.products.map(async (product) => {
        const productAvailable = await productManager.findById({
          _id: product.pid._id,
        });
        logger.info({ "Aqui productAvailable": productAvailable.stock });
        if (!productAvailable || productAvailable.stock < product.quantity) {
          productsNotPurchased.push(product.pid.toString());
        } else {
          let finalStock = productAvailable.stock - product.quantity;
          logger.warning({ AquiFinalStock: finalStock });
          await productManager.updateProductStockById(
            productAvailable._id,
            finalStock
          );
          productsToBuy.push({
            pid: product.pid._id,
            quantity: product.quantity,
            price: productAvailable.price,
          });
        }
      })
    );
      logger.info(productsToBuy)
      const calculateTotalAmount = productsToBuy.reduce(
        (total, product) => total + product.price * product.quantity,
        0
      );
    const ticketData = {
      purchase_datetime: new Date(),
      amount: calculateTotalAmount,
      purchaser: 'algo',
    };
    const ticket = await ticketManager.createTicket(ticketData); 
    logger.info({ "AQUI PRODUCTSTOBUY": productsToBuy });
    const result = {
      productsToBuy: productsToBuy,
      productsNotPurchasedCount: productsNotPurchased.length,
      ticket: ticket,
    };
    return result
  } catch (error) {
    console.log(error);
  }
};




