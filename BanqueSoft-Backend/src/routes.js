import express from "express";

import AdministradorRouter from "./routes/administradorRouter.js";
import categoriaRouter from "./routes/categoriaRouter.js";
import CitaRouter from "./routes/citaRouter.js";
import ClienteRouter from "./routes/clienteRouter.js";
import menajeRouter from "./routes/menajeRouter.js";
import PrestadorServicioRouter from "./routes/prestadorServicioRouter.js";
import promocionRouter from "./routes/promocionRouter.js";
import proveedorRouter from "./routes/proveedorRouter.js";
import ServicioRouter from "./routes/servicioRouter.js";
import TipoDeEventoRouter from "./routes/tipoDeEventoRouter.js";

import {
    cambiarContrasenia,
  recuperarContrasenia,
} from "./recuperarContraseña.js";
import contratoRouter from "./routes/contratoRouter.js";

const router = express.Router();

// Usa los routers para diferentes rutas
router.use("/menaje", menajeRouter);
router.use("/proveedor", proveedorRouter);
router.use("/promocion", promocionRouter);
router.use("/categoria", categoriaRouter);
router.use("/tipo-de-evento", TipoDeEventoRouter);
router.use("/prestador-servicio", PrestadorServicioRouter);
router.use("/servicio", ServicioRouter);
router.use("/administrador", AdministradorRouter);
router.use("/cliente", ClienteRouter);
router.use("/cita", CitaRouter);
router.use("/contrato", contratoRouter);

router.post("/recuperar-contrasenia", recuperarContrasenia);
router.post("/cambiar-contrasenia", cambiarContrasenia );



export default router;
