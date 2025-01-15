import { Router } from "express";
import { passengerController } from "../controllers/passenger.controllers.js";
import { verifyAdmin, verifyToken } from "../middlewares/jwt.middlewares.js";

const router = Router();

router.get("/", verifyToken, verifyAdmin, passengerController.getAll);

router.post(
  "/create",
  verifyToken,
  verifyAdmin,
  passengerController.createPassenger
);

router.delete(
  "/delete/:id_passenger",
  verifyToken,
  verifyAdmin,
  passengerController.deletePassenger
);

export default router;
