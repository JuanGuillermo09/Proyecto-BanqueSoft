import express from "express";
import {
    cambiarEstadoCategoria,
  createcategoria,
  deletecategoria,
  getAllcategoria,
  getcategoriaById,
  updatecategoria,
} from "../controllers/categoriaController.js";

const categoriaRouter = express.Router();

categoriaRouter.post("/createcategoria", createcategoria);
categoriaRouter.get("/getAllcategoria", getAllcategoria);
categoriaRouter.get("/getcategoriaById/:id", getcategoriaById);
categoriaRouter.put("/updatecategoria/:id", updatecategoria);
categoriaRouter.delete("/deletecategoria/:id", deletecategoria);
categoriaRouter.put("/cambiarEstadoCategoria/:id", cambiarEstadoCategoria);

export default categoriaRouter;
