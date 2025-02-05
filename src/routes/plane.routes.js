import { Router } from "express";

import { planeControllers } from "../controllers/plane.controllers.js";
import { verifyAdmin, verifyToken } from "../middlewares/jwt.middlewares.js";

const router = Router();

router.post("/create", planeControllers.createPlane);

router.get("/", planeControllers.getAll);
router.get("/statuses", planeControllers.getStatuses);
router.get(
  "/:tuition",

  planeControllers.getPlaneById
);

router.get(
  "/status/:id_status",

  planeControllers.getPlaneByStatus
);

router.put(
  "/update/:tuition",
  verifyToken,
  verifyAdmin,
  planeControllers.updateFlight
);

router.delete("/delete/:tuition", planeControllers.deletePlane);
export default router;
