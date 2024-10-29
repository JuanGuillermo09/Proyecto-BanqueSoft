import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import fileUpload from "express-fileupload";
import corsOptions from "./config/cors.js"; // Importa la configuración de CORS
import router from "./routes.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Configura CORS usando el archivo de configuración
app.use(cors(corsOptions));

// Configura body-parser para manejar grandes cargas
app.use(bodyParser.json({ limit: "50mb" })); // Ajusta el límite según tus necesidades
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

// Configura fileUpload para manejar archivos grandes
app.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 }, // 50 MB
  })
);

// Usa las rutas configuradas
app.use("/api", router);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
