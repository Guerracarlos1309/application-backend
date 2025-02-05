import { Router } from "express";
import { userController } from "../controllers/users.controllers.js";
import {
  verifyAdmin,
  verifyToken,
  // removeToken,
  // validateToken,
} from "../middlewares/jwt.middlewares.js";

const router = Router();

router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/resetPassword", userController.resetPassword);
router.get("/profile", verifyToken, userController.profile);

// admin
router.get("/", userController.findAll);
router.put(
  "/update-role/:iduser",
  verifyToken,
  verifyAdmin,
  userController.updateRole
);

router.post("/logout", verifyToken, userController.logout);
7;
router.delete("/:iduser", userController.deleteUser);

export default router;
