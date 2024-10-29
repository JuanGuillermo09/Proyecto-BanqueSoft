import express from "express";
import {
  cambiarEstadoProveedor,
  createproveedor,
  deleteproveedor,
  getAllproveedor,
  getproveedorById,
  updateproveedor,
} from "../controllers/proveedorController.js";

const proveedorRouter = express.Router();

proveedorRouter.post("/createproveedor", createproveedor);
proveedorRouter.get("/getAllproveedor", getAllproveedor);
proveedorRouter.get("/getproveedorById/:id", getproveedorById);
proveedorRouter.put("/updateproveedor/:id", updateproveedor);
proveedorRouter.delete("/deleteproveedor/:id", deleteproveedor);
proveedorRouter.put("/cambiarEstadoProveedor/:id", cambiarEstadoProveedor);

export default proveedorRouter;
