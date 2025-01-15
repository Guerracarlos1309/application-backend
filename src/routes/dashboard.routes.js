import { Router } from "express";
import { verifyAdmin, verifyToken } from "../middlewares/jwt.middlewares.js";
import { dashboardControllers } from "../controllers/dashboard.controllers.js";
import { flightController } from "../controllers/flights.controllers.js";
import { planeControllers } from "../controllers/plane.controllers.js";
import { reservesController } from "../controllers/reserves.controllers.js";
import { userController } from "../controllers/users.controllers.js";

const router = Router();

router.get("/", verifyToken, verifyAdmin, dashboardControllers.getData);

router.get("/flights", verifyToken, verifyAdmin, flightController.getAll);
router.get("/plane", verifyToken, verifyAdmin, planeControllers.getAll);
router.get(
  "/reservation",
  verifyToken,
  verifyAdmin,
  reservesController.getAllReserves
);
router.get("/user", verifyToken, verifyAdmin, userController.findAll);

export default router;
