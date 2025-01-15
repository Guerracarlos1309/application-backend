import { Router } from "express";
import { userController } from "../controllers/users.controllers.js";
import {
  verifyAdmin,
  verifyToken,
  removeToken,
} from "../middlewares/jwt.middlewares.js";
// import {
//   getUsers,
//   getUserById,
//   newUsers,
// } from "../controllers/users.controllers.js";

const router = Router();

router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/resetPassword", userController.resetPassword);
router.get("/profile", verifyToken, userController.profile);

// addmin
router.get("/", verifyToken, verifyAdmin, userController.findAll);
router.put(
  "/update-role/:iduser",
  verifyToken,
  verifyAdmin,
  userController.updateRole
);

router.post("/logout", verifyToken, removeToken, userController.logout);
7;
router.delete(
  "/delete/:iduser",
  verifyToken,
  verifyAdmin,
  userController.deleteUser
);

export default router;
