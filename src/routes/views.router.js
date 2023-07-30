import { Router } from "express";
import { ProductManager } from "../DAL/DAOs/productDaos/productsManager.js";
import { ensureAuthenticated } from "../middleware/ensureAuthenticated.js";
import {
  getHome,
  getRegister,
  getProductsControllers,
  getProductByIdControllers,
  addProductToCartControllers,
  getCartByIdControllers,
  purchaseCartControllers,
  forgotPassControllers
} from "../controllers/views.controllers.js";
import { ROL_USER } from "../DAL/MongoDB/models/users.model.js";
import { logger } from "../utils/winston.js";

const router = Router();

//Route para prueba de logger
router.get("/loggerTest", (req, res)=>{
  logger.warning({message: 'Probando logger warning'})
  logger.debug({message:'Probando logger debug'})
  logger.error({message:'Probando log error'})
  logger.info({message:'Probando logger info'})
  logger.http('Probando logger http')
  logger.fatal('Probando logger fatal')
res.send('Probando Test de Logger')
})

router.get("/", getHome);

router.get("/register", getRegister);

router.get("/products", ensureAuthenticated (ROL_USER),getProductsControllers);

router.get("/products/:id", getProductByIdControllers)

router.post("/cart/product/:pid", ensureAuthenticated (ROL_USER),addProductToCartControllers )

router.get('/cart/:cid', getCartByIdControllers)

router.get('/cart/:cid/purchase', purchaseCartControllers)

router.get("/forgotpass", forgotPassControllers)

router.post('/forgotpass', forgotPassControllers )





export default router;
