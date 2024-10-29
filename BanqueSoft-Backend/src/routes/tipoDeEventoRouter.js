import express from "express";
import {
    cambiarEstadoTipoDeEvento,
  createTipoDeEvento,
  updateTipoDeEvento,
  getAllTipoDeEvento,
  getTipoDeEventoById,
  deleteTipoDeEvento,
} from "../controllers/tipoDeEventoController.js";

const TipoDeEventoRouter = express.Router();

TipoDeEventoRouter.post("/createTipoDeEvento", createTipoDeEvento);
TipoDeEventoRouter.get("/getAllTipoDeEvento", getAllTipoDeEvento);
TipoDeEventoRouter.get("/getTipoDeEventoById/:id", getTipoDeEventoById);
TipoDeEventoRouter.put("/updateTipoDeEvento/:id", updateTipoDeEvento);
TipoDeEventoRouter.delete("/deleteTipoDeEvento/:id", deleteTipoDeEvento);
TipoDeEventoRouter.put("/cambiarEstadoTipoDeEvento/:id", cambiarEstadoTipoDeEvento);

export default TipoDeEventoRouter;
