import { Router } from "express";
import {
  getCrew,
  getCrewById,
  postCrew,
} from "../controllers/crew.controllers.js";

const router = Router();

router.get("/crew", (req, res) => {
  const crews = getCrew();

  if (!crews) {
    return res.json({ mensaje: "No crew found" });
  }
  res.json(crews);
});
router.get("/crew/:id", async (req, res) => {
  const { id } = req.params;
  const crew = await getCrewById(parseInt(id));

  if (crew) {
    res.json(crew);
  } else {
    res.json({ mensaje: "Crew not found" });
  }
});
router.post("/crew", (req, res) => {
  const body = req.body;
  const result = postCrew(body);

  if (result.error) {
    res.json({ mensaje: result.mensaje });
  } else {
    res.json({ mensaje: result.mensaje, crew: result.crew });
  }
});

export default router;
