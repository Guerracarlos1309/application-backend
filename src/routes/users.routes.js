import { Router } from "express";
import {
  getUsers,
  getUserById,
  newUsers,
} from "../controllers/users.controllers.js";

const router = Router();

router.get("/users", (req, res) => {
  const users = getUsers();
  res.json(users);
});

router.get("/users/:userId", async (req, res) => {
  const { userId } = req.params;
  const user = await getUserById(parseInt(userId));
  if (user) {
    res.json(user);
  } else {
    res.json({ mensaje: "User not found" });
  }
});
router.post("/users", (req, res) => {
  const body = req.body;
  const result = newUsers(body);

  if (result.error) {
    res.json({ mensaje: result.mensaje });
  } else {
    res.json({ mensaje: result.mensaje, user: result.user });
  }
});

router.delete("/users/:userId", (req, res) => {
  res.send("eliminando usuarios");
});

router.put("/users/:userId", (req, res) => {
  res.send("actualizando usuarios");
});

export default router;
