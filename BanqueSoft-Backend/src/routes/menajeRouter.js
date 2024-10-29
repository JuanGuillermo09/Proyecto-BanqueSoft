import express from "express";
import {
  cambiarEstadoMenaje,
  createmenaje,
  deletemenaje,
  getAllmenaje,
  getmenajeById,
  updatemenaje,
} from "../controllers/menajeController.js";

const menajeRouter = express.Router();

menajeRouter.post("/createmenaje", createmenaje);
menajeRouter.get("/getAllmenaje", getAllmenaje);
menajeRouter.get("/getmenajeById/:id", getmenajeById);
menajeRouter.put("/updatemenaje/:id", updatemenaje);
menajeRouter.delete("/deletemenaje/:id", deletemenaje);
menajeRouter.put("/cambiarEstadoMenaje/:id", cambiarEstadoMenaje);

export default menajeRouter;
