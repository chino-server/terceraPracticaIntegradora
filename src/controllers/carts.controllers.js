import {
  addCartService,
  getByIdService,
  addProductToCartService,
  updateProductFromCart,
  delCartServices,
} from "../services/carts.services.js";
import { logger } from "../utils/winston.js";

export const addCartControllers = async (req, res) => {
  try {
    const cart = await addCartService();
    res.status(200).json({ message: "Cart creado exitosamente", cart });
  } catch (error) {
    res.status(500).json({ message: "Ocurrio un error" });
  }
};

export const getByIdControllers = async (req, res) => {
  try {
    const { cartId } = req.params;
    const response = await getByIdService(cartId);
    if (response) {
      return res.status(200).send({ status: "Succes", payload: response });
    } else {
      res.status(404).send({ status: "error", error: "Carrito no encontrado" });
    }
  } catch (error) {
    console.error(err);
    res
      .status(500)
      .send({ status: "error", error: "Error al obtener el carrito" });
  }
};

export const addProductToCartControllers = async (req, res) => {
  try {
    const { cid, pid, quantity } = req.params;
   console.log(req.params)

    const cart = await addProductToCartService(cid, pid, quantity);

    if (cart) {
      res.status(201).send({ status: "success", payload: cart });
    } else {
      res
        .status(404)
        .send({ status: "error", error: "Carrito o producto no encontrado" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({
      status: "error",
      error: "Error al agregar el producto al carrito",
    });
  }
};

export const updateCart = async (req, res) => {
  try {
    const { pid } = req.params;
    const { product } = req.body;

    if (!pid || !product) {
      return res
        .status(400)
        .json({ error: "Solicitud mal formada. Faltan datos necesarios." });
    }

    const updatedCart = await updateProductFromCart(pid, product);

    if (!updatedCart) {
      return res
        .status(404)
        .json({
          error: "No se pudo actualizar el carrito. Verifica tus datos.",
        });
    }

    res.json(updatedCart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const delCartControllers = async (req, res) => {
    const {cid} = req.params;
    try {
        if (!cid) {
            return res.status(400).json({ error: 'Solicitud mal formada. Faltan datos necesarios.' });
        }

        const delCart = await delCartServices(cid);

        if (!delCart) {
            return res.status(404).json({ error: 'No se pudo borrar el carrito. Verifica tus datos.' });
        }

        res.status(200).json({message:'Carrito Borrado con exito'});
        return delCart;
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Ha ocurrido un error interno en el servidor.' });
    }
}
