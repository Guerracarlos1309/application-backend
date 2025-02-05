import { Router } from "express";
import { reservesController } from "../controllers/reserves.controllers.js";
import { verifyAdmin, verifyToken } from "../middlewares/jwt.middlewares.js";

const router = Router();

router.get("/", reservesController.getAllReserves);

router.post("/create", reservesController.createReserve);
router.post("/findByDate", reservesController.findByReservationByDate);
router.put(
  "/update",
  verifyToken,
  verifyAdmin,
  reservesController.updateStatus
);

router.delete(
  "/delete/:id_reservation",
  verifyToken,
  verifyAdmin,
  reservesController.deleteReserve
);
export default router;
