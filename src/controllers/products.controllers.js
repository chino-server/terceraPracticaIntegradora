import { logger } from "../utils/winston.js";
import {
  getProducts,
  findById,
  addProduct,
  updateById,
  deleteById,
} from "../services/products.services.js";

export const getAllProducts = async (req, res) => {
  try {
    const { limit, page, sort, query } = req.query;
    const products = await getProducts({ limit, page, sort, query });
    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Ocurrio un error" });
  }
};

export const findProductById = async (req, res, next) => {
  try {
    const id = req.params.pid;
    console.log(id);
    const product = await findById(id);
    
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ message: "Producto not found" });
    }
  } catch (error) {
    next (error)
  }
};

export const addControllerProduct = async (req, res) => {
  try {
    const product = req.body;
    if (
      !product.title ||
      !product.description ||
      !product.price ||
      !product.code ||
      !product.stock ||
      !product.category
    ) {
      res
        .status(400)
        .send({ status: "error", error: "Todos los campos son obligatorios" });
      return;
    }
    const newProduct = await addProduct(product);
    if (!newProduct) {
      res
        .status(400)
        .json({ status: "error", error: "El código del producto ya existe" });
    } else {
      res.status(201).json({ status: "success", payload: newProduct });
    }
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ status: "error", error: "Error al agregar el producto" });
  }
};

export const updateByIdControllers = async (req, res) => {
  try {
    const { pid } = req.params;
    const product = req.body;
    const updatedProduct = await updateById({ _id: pid }, product);
    if (!updatedProduct) {
      res
        .status(404)
        .send({ status: "error", error: "Producto no encontrado" });
    } else {
      res.status(201).send({ status: "success", payload: updatedProduct });
    }
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .send({ status: "error", error: "Error al actualizar el producto" });
  }
};

export const deleteByIdControllers = async (req, res) => {
  try {
    const { pid } = req.params;

    const deletedProduct = await deleteById(pid);
    if (!deletedProduct) {
      res
        .status(404)
        .send({ status: "error", error: "Producto no encontrado" });
    } else {
      res.status(201).send({ status: "success", payload: deletedProduct });
    }
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .send({ status: "error", error: "Error al borrar el producto" });
  }
}
