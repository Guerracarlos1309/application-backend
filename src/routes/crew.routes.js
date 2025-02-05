import { Router } from "express";
import { crewController } from "../controllers/crew.controllers.js";
import { verifyAdmin, verifyToken } from "../middlewares/jwt.middlewares.js";

const router = Router();

router.post("/create", crewController.createCrewMember);

router.get("/", crewController.getAllCrewMembers);
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

router.delete("/delete/:id_license", crewController.deleteCrewMember);
export default router;
