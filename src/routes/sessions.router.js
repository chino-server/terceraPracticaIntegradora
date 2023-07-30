import { Router } from "express";
import { getCurrentSession } from "../controllers/sessions.controllers.js";


const router = Router()

router.get ('/', getCurrentSession)

export default router