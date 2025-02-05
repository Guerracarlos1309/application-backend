import { Router } from "express";
import { flightController } from "../controllers/flights.controllers.js";

import { verifyAdmin, verifyToken } from "../middlewares/jwt.middlewares.js";

const router = Router();

router.post("/create", flightController.createFlight);

router.get("/", flightController.getAll);
router.get("/:id_flight", verifyToken, verifyAdmin, flightController.getById);

router.put(
  "/update/:id_flight",
  verifyToken,
  verifyAdmin,
  flightController.updateFlight
);

router.delete("/delete/:id_flight", flightController.deleteFlight);

export default router;
