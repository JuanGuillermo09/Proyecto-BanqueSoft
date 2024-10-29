import express from "express";
import {
  createCliente,
  deleteCliente,
  getAllCliente,
  getClienteById,
  updateCliente,
  loginCliente
} from "../controllers/clienteController.js";

const ClienteRouter = express.Router();

ClienteRouter.post("/createCliente", createCliente);
ClienteRouter.get("/getAllCliente", getAllCliente);
ClienteRouter.get("/getClienteById/:id", getClienteById);
ClienteRouter.put("/updateCliente/:id", updateCliente);
ClienteRouter.delete("/deleteCliente/:id", deleteCliente);
ClienteRouter.post("/loginCliente", loginCliente);


export default ClienteRouter;
