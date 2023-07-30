import { Router } from "express";
import { addCartControllers, getByIdControllers,addProductToCartControllers,updateCart,delCartControllers } from "../controllers/carts.controllers.js";

const router = Router ()

router.post('/cart',addCartControllers )

router.get('/cart/:cartId', getByIdControllers)

router.post('/cart/:cid/product/:pid',addProductToCartControllers )

router.put("/cart/:pid",updateCart )

router.delete("/cart/:cid",delCartControllers)

export default router