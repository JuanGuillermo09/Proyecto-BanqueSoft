import { DataTypes } from "sequelize";
import sequelize from "../config/dataBase.js";

// Define el modelo de PrestadorServicio sin timestamps

const PrestadorServicio = sequelize.define(
  "tbl_prestador_servicio",
  {
    Tipo_documento: {
      type: DataTypes.STRING(13),
      allowNull: true,
      defaultValue: null,
    },
    Cod_prestador_servicio: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      primaryKey: true,
      autoIncrement: true,
    },
    Identificacion: {
      type: DataTypes.STRING(13),
      allowNull: true,
      defaultValue: null,
    },
    Nombre: {
      type: DataTypes.STRING(45),
      allowNull: true,
      defaultValue: null,
    },
    Apellidos: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: null,
    },
    Genero: {
      type: DataTypes.STRING(10),
      allowNull: true,
      defaultValue: null,
    },
    Telefono: {
      type: DataTypes.STRING(15),
      allowNull: true,
      defaultValue: null,
    },
    Direccion: {
      type: DataTypes.STRING(45),
      allowNull: true,
      defaultValue: null,
    },
    Email: {
      type: DataTypes.STRING(40),
      allowNull: true,
      defaultValue: null,
    },
    Estado: {
      type: DataTypes.TINYINT,
      allowNull: true,
      defaultValue: 1,
    },
  },
  {
    tableName: "tbl_prestador_servicio",
    timestamps: false, // Desactiva createdAt y updatedAt
  }
);

// Sincroniza el modelo con la base de datos
sequelize
  .sync()
  .then(() =>
    console.log("Prestador Servicio table has been created, if one doesn't exist")
  )
  .catch((error) => console.error("This error occurred:", error));

  export default PrestadorServicio;