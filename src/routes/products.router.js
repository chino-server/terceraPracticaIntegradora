import { Router } from "express";
import {
  getAllProducts,
  findProductById,
  addControllerProduct,
  updateByIdControllers,
  deleteByIdControllers,
} from "../controllers/products.controllers.js";

import { ROL_USER,ROL_ADMIN } from "../DAL/MongoDB/models/users.model.js";
import { ensureAuthenticated } from "../middleware/ensureAuthenticated.js";
import { handleError } from "../middleware/errorMiddleware/errorMiddleware.js";

const router = Router();
// Endpoint para actualizar traer todos los productos
router.get("/products",ensureAuthenticated(ROL_USER) ,getAllProducts);

// Endpoint para buscar un producto por ID
router.get("/product/:pid", findProductById);

// Endpoint para agregar un producto
router.post("/product", ensureAuthenticated(ROL_ADMIN), addControllerProduct);

// Endpoint para actualizar un producto
router.put("/product/:pid", ensureAuthenticated(ROL_ADMIN),updateByIdControllers);

// Endpoint para eliminar un producto

router.delete("/product/:pid", ensureAuthenticated(ROL_ADMIN),deleteByIdControllers);

router.use(handleError)

export default router;

