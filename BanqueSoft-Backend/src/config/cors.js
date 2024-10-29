// Configuración de CORS
const corsOptions = {
  origin: "http://localhost:4200", // Permite solicitudes desde tu frontend
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"],
};

export default corsOptions;
