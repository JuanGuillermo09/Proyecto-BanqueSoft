import express from "express";
import {
  cambiarEstadoServicio,
  createServicio,
  deleteServicio,
  getAllServicio,
  getServicioById,
  updateServicio,
} from "../controllers/servicioController.js";

const ServicioRouter = express.Router();

ServicioRouter.post("/createServicio", createServicio);
ServicioRouter.get("/getAllServicio", getAllServicio);
ServicioRouter.get("/getServicioById/:id", getServicioById);
ServicioRouter.put("/updateServicio/:id", updateServicio);
ServicioRouter.delete("/deleteServicio/:id", deleteServicio);
ServicioRouter.put("/cambiarEstadoServicio/:id", cambiarEstadoServicio);

export default ServicioRouter;
