import { Router } from "express";
import {
  getReserves,
  getReserveById,
  newReserves,
} from "../controllers/reserves.controllers.js";

const router = Router();

router.get("/reserves", (req, res) => {
  const reserves = getReserves();
  res.json(reserves);
});

router.get("/reserves/:id", async (req, res) => {
  const { id } = req.params;
  const reserve = await getReserveById(parseInt(id));

  if (reserve) {
    res.json(reserve);
  } else {
    res.json({ mensaje: "Reserve not found" });
  }
});

router.post("/reserves", (req, res) => {
  const body = req.body;
  const result = newReserves(body);

  if (result.error) {
    res.json({ mensaje: result.mensaje });
  } else {
    res.json({ mensaje: result.mensaje, flight: result.reserve });
  }
});

export default router;
