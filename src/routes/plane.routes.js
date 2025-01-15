import { Router } from "express";

import { planeControllers } from "../controllers/plane.controllers.js";
import { verifyAdmin, verifyToken } from "../middlewares/jwt.middlewares.js";

const router = Router();

router.post("/create", verifyToken, verifyAdmin, planeControllers.createPlane);

router.get("/", verifyToken, verifyAdmin, planeControllers.getAll);
router.get(
  "/:tuition",
  verifyToken,
  verifyAdmin,
  planeControllers.getPlaneById
);
router.get(
  "/status/:id_status",
  verifyToken,
  verifyAdmin,
  planeControllers.getPlaneByStatus
);

router.put(
  "/update/:tuition",
  verifyToken,
  verifyAdmin,
  planeControllers.updateFlight
);

router.delete(
  "/delete/:tuition",
  verifyToken,
  verifyAdmin,
  planeControllers.deletePlane
);
export default router;
