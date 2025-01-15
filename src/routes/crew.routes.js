import { Router } from "express";
import { crewController } from "../controllers/crew.controllers.js";
import { verifyAdmin, verifyToken } from "../middlewares/jwt.middlewares.js";

const router = Router();

router.post(
  "/create",
  verifyToken,
  verifyAdmin,
  crewController.createCrewMember
);

router.get("/", verifyToken, verifyAdmin, crewController.getAllCrewMembers);
router.get(
  "/search",
  verifyToken,
  verifyAdmin,
  crewController.getCrewByFlightHours
);
router.put(
  "/update/:id_license",
  verifyToken,
  verifyAdmin,
  crewController.updateCrewMember
);

router.delete(
  "/delete/:id_license",
  verifyToken,
  verifyAdmin,
  crewController.deleteCrewMember
);
export default router;
