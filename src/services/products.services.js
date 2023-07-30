import { ProductManager } from "../DAL/DAOs/productDaos/productsManager.js";
import { logger } from "../utils/winston.js";

const productManager = new ProductManager();

export const getProducts = async (params) => {
  try {
    const limit = parseInt(params.limit) || 8 ;
    const page = parseInt(params.page) || 1;
    let sort = {};
    if (params.sort === "asc") {
      sort = { price: 1 };
    } else {
      sort = { price: -1 };
    }
    const query = params.query || "";
    const search = query
      ? {
          stock: { $gt: 0 },
          $or: [
            { category: { $regex: query, $options: "i" } },
            { title: { $regex: query, $options: "i" } },
          ],
        }
      : { stock: { $gt: 0 } };

    const opcions = {
      limit,
      page,
      sort,
      lean: true,
    };

    const products = await productManager.getProducts(search, opcions);
    return products;
  } catch (error) {
    console.log(error);
  }
};

export const findById = async (id) => {
  try {
    const product = await productManager.findById(id);
    logger.info(product)
    return product;
  } catch (error) {
    console.log(error);
  }
};

export const addProduct = async (product) => {
  try {
    const response = await productManager.addProduct(product)
    return response
  } catch (error) {
    console.log(error);
  }
};

export const updateById = async (id,obj)=>{
  try {
    const newProduct= productManager.updateById(id,obj)
    return newProduct
  } catch (error) {
    console.log(error);
  }
}

export const deleteById = async (id)=>{
  console.log(id);
  try {
    const deleteProduct = await productManager.deleteById(id)
    return deleteProduct
  } catch (error) {
    console.log(error);
  }
}