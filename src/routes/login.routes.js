import { Router } from "express";
import { login } from "../controllers/login.controllers.js";

const router = Router();

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  const { existingUser, correctPassword } = login(email, password);

  if (!existingUser) {
    res.json({ mensaje: "Incorrect username" });
  }

  if (!correctPassword) {
    res.json({ mensaje: "Incorrect password" });
  } else {
    res.json({ mensaje: "Logged in successfully" });
  }
});

export default router;
