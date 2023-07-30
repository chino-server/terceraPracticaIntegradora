import { cartsModel } from "../../MongoDB/models/carts.model.js";
import { productsModel } from "../../MongoDB/models/products.model.js";
import { logger } from "../../../utils/winston.js";

export default class CartsManager {
  async addCart() {
    try {
      const newCart = new cartsModel();
      await newCart.save();
      return newCart;
    } catch (error) {
      console.log(error);
    }
  }

  async getById(id) {
    try {
      const cart = await cartsModel.findById(id).populate("products.pid");
      return cart;
    } catch (error) {
      console.log(error);
    }
  }

  async addProductToCart(cartId, productId) {
    try {
      const cart = await cartsModel.findById(cartId);

      if (!cart) {
        return null;
      }

      const pro = await productsModel.findById(productId);
      if (!pro) {
        return null;
      }
      logger.info(typeof(pro))
      const product = cart.products.find(
        (product) => product.pid.toString() === productId
      );
      console.log(product);

      if (!product) {
        console.log("first");
        cart.products.push({ pid: productId, quantity: 1 });
        await cart.save();
      } else {
        console.log("second");
        product.quantity++;
        await cart.updateOne({ products: cart.products });
      }
      return cart;
    } catch (error) {
      console.log(error);
    }
  }

  async updateAllProductFromCart(cartId, product) {
    try {
      const updateCart = await cartsModel.updateOne(
        { _id: cartId },
        { products: product }
      );
      return updateCart;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteCart(cartId) {
    const delCart = cartsModel.deleteOne({ _id: cartId });
    return delCart;
  }
}
