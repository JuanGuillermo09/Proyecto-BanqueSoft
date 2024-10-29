import { Sequelize } from "sequelize";


// Configura la conexión a la base de datos MySQL
const sequelize = new Sequelize("banquesoft", "root", "juan", {
  host: "localhost",
  dialect: "mysql",
});

// Probar la conexión con la base de datos
sequelize
  .authenticate()
  .then(() => console.log("Conectado a MySQL"))
  .catch((error) => console.error("Error al conectar a MySQL:", error));

export default sequelize;
