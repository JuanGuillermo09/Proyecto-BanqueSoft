import express from "express";
import {
    cambiarEstadoPrestadorServicio,
  createPrestadorServicio,
  updatePrestadorServicio,
  getAllPrestadorServicio,
  getPrestadorServicioById,
  deletePrestadorServicio,
} from "../controllers/prestadorServicioController.js";

const PrestadorServicioRouter = express.Router();

PrestadorServicioRouter.post("/createPrestadorServicio", createPrestadorServicio);
PrestadorServicioRouter.get("/getAllPrestadorServicio", getAllPrestadorServicio);
PrestadorServicioRouter.get("/getPrestadorServicioById/:id", getPrestadorServicioById);
PrestadorServicioRouter.put("/updatePrestadorServicio/:id", updatePrestadorServicio);
PrestadorServicioRouter.delete("/deletePrestadorServicio/:id", deletePrestadorServicio);
PrestadorServicioRouter.put("/cambiarEstadoPrestadorServicio/:id", cambiarEstadoPrestadorServicio);

export default PrestadorServicioRouter;
