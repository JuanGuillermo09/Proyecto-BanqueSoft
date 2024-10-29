import express from "express";
import {
  cambiarEstadoPromocion,
  createpromocion,
  deletepromocion,
  getAllpromocion,
  getpromocionById,
  updatepromocion,
} from "../controllers/promocionController.js";

const promocionRouter = express.Router();

promocionRouter.post("/createpromocion", createpromocion);
promocionRouter.get("/getAllpromocion", getAllpromocion);
promocionRouter.get("/getpromocionById/:id", getpromocionById);
promocionRouter.put("/updatepromocion/:id", updatepromocion);
promocionRouter.delete("/deletepromocion/:id", deletepromocion);
promocionRouter.put("/cambiarEstadoPromocion/:id", cambiarEstadoPromocion);

export default promocionRouter;
