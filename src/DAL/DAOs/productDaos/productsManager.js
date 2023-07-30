import mongoose from "mongoose";
import { productsModel } from "../../MongoDB/models/products.model.js";

export class ProductManager {
  async getProducts(search, opcions) {
    try {
      const products = await productsModel.paginate(search, opcions);
      return products;
    } catch (error) {
      if (error instanceof mongoose.Error.CastError) {
        throw new Error("INVALID_SEARCH_PARAMETERS");
      }
      throw new Error("NOT_PRODUCTS_PAGINATE");
    }
  }

  async addProduct(product) {
    try {
      const newProduct = new productsModel(product);
      await newProduct.save();
      return newProduct;
    } catch (error) {
      console.log(error);
    }
  }

  async findById(id) {
    try {
      const product = await productsModel.findById(id);
      return product;
    } catch (error) {
      throw new Error("PRODUCT_NOT_FOUND");
    }
  }

  async deleteById(id) {
    try {
      const product = await productsModel.deleteOne({ _id: id });
      return product;
    } catch (error) {
      console.log(error);
    }
  }

  async updateById(id, obj) {
    try {
      const product = await productsModel.updateOne({ _id: id }, { $set: obj });
      return product;
    } catch (error) {
      console.log(error);
    }
  }

  async updateProductStockById(productId, newStock) {
    try {
      const updatedProduct = await productsModel.updateOne(
        { _id: productId },
        { $set: { stock: newStock } }
      );
      return updatedProduct;
    } catch (error) {
      console.error(error);
      throw new Error("Error al actualizar el Stock del producto");
    }
  }
}
