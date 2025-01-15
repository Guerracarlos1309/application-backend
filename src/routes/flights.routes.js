import { Router } from "express";
import { flightController } from "../controllers/flights.controllers.js";

import { verifyAdmin, verifyToken } from "../middlewares/jwt.middlewares.js";

const router = Router();

router.post("/create", verifyToken, verifyAdmin, flightController.createFlight);

router.get("/", verifyToken, verifyAdmin, flightController.getAll);
router.get("/:id_flight", verifyToken, verifyAdmin, flightController.getById);

router.put(
  "/update/:id_flight",
  verifyToken,
  verifyAdmin,
  flightController.updateFlight
);

router.delete(
  "/delete/:id_flight",
  verifyToken,
  verifyAdmin,
  flightController.deleteFlight
);

export default router;
