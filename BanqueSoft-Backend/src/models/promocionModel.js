import { DataTypes } from "sequelize";
import sequelize from "../config/dataBase.js";
// Importa la configuración de la base de datos

const Promocion = sequelize.define(
  "tbl_promocion",
  {
    Cod_Promocion: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    Descripcion: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    Imagen: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    Fecha_publicacion: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    Estado: {
      type: DataTypes.TINYINT(1),
      defaultValue: 1,
    },
  },
  {
    tableName: "tbl_promocion",
    timestamps: false, // Si no usas los campos `createdAt` y `updatedAt`
  }
);

sequelize
  .sync()
  .then(() =>
    console.log("Promocion table has been created, if one doesn't exist")
  )
  .catch((error) => console.error("This error occurred:", error));

export default Promocion;
