import express from "express";
import {
  cambiarEstadoAdministrador,
  createAdministrador,
  deleteAdministrador,
  getAllAdministrador,
  getAdministradorById,
  updateAdministrador,
  loginAdministrador
} from "../controllers/administradorController.js";

const AdministradorRouter = express.Router();

AdministradorRouter.post("/createAdministrador", createAdministrador);
AdministradorRouter.get("/getAllAdministrador", getAllAdministrador);
AdministradorRouter.get("/getAdministradorById/:id", getAdministradorById);
AdministradorRouter.put("/updateAdministrador/:id", updateAdministrador);
AdministradorRouter.delete("/deleteAdministrador/:id", deleteAdministrador);
AdministradorRouter.put("/cambiarEstadoAdministrador/:id", cambiarEstadoAdministrador);
AdministradorRouter.post("/loginAdministrador", loginAdministrador);

export default AdministradorRouter;
