import { Router } from "express";
import { validateUserForm } from "../middleware/validateUserForm.js";
import { registerUser } from "../controllers/users.controllers.js";

import passport from "passport";

const router = Router();

router.post("/", passport.authenticate("login"), async (req, res) => {
  res.redirect("/products");
});

router.post("/register", validateUserForm, registerUser);

router.get(
  "/logout",
  passport.authenticate("signup", { successRedirect: "/products" })
);

router.get(
  "/signUpGitHub",
  passport.authenticate("github", { scope: ["user:email"] })
);
router.get("/github", passport.authenticate("github"), (req, res) => {
  res.send("Usuario creado con la estrategia de GitHub");
});

export default router;
