import express from "express";
import {
  cambiarEstadoContrato,
  createcontrato,
  deletecontrato,
  getAllcontrato,
  getcontratoById,
  updatecontrato,
} from "../controllers/contratoCotroller.js";

const contratoRouter = express.Router();

contratoRouter.post("/createcontrato", createcontrato);
contratoRouter.get("/getAllcontrato", getAllcontrato);
contratoRouter.get("/getcontratoById/:id", getcontratoById);
contratoRouter.put("/updatecontrato/:id", updatecontrato);
contratoRouter.delete("/deletecontrato/:id", deletecontrato);
contratoRouter.put("/cambiarEstadocontrato/:id", cambiarEstadoContrato);

export default contratoRouter;
