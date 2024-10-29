import express from "express";
import {
  cambiarEstadoCita,
  createCita,
  deleteCita,
  getAllCita,
  getCitaById,
  updateCita,

} from "../controllers/citaController.js";

const CitaRouter = express.Router();

CitaRouter.post("/createCita", createCita);
CitaRouter.get("/getAllCita", getAllCita);
CitaRouter.get("/getCitaById/:id", getCitaById);
CitaRouter.put("/updateCita/:id", updateCita);
CitaRouter.delete("/deleteCita/:id", deleteCita);
CitaRouter.put("/cambiarEstadoCita/:id", cambiarEstadoCita);


export default CitaRouter;
