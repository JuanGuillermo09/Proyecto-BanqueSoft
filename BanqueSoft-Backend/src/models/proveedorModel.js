import { DataTypes } from "sequelize";
import sequelize from "../config/dataBase.js";

// Define el modelo de Proveedor sin timestamps
const Proveedor = sequelize.define(
  "tbl_proveedor",
  {
    Cod_proveedor: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      autoIncrement: true,
      primaryKey: true,
    },
    Nombre_representante: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    Nit: {
      type: DataTypes.STRING(13),
      allowNull: true,
    },
    Telefono: {
      type: DataTypes.STRING(15),
      allowNull: true,
    },
    Direccion: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    Email: {
      type: DataTypes.STRING(40),
      allowNull: true,
    },
    Estado: {
      type: DataTypes.TINYINT,
      allowNull: true,
      defaultValue: 1,
    },
  },
  {
    tableName: "tbl_proveedor",
    timestamps: false, // Desactiva createdAt y updatedAt
  }
);

// Sincroniza el modelo con la base de datos
sequelize
  .sync()
  .then(() =>
    console.log("Proveedor table has been created, if one doesn't exist")
  )
  .catch((error) => console.error("This error occurred:", error));

export default Proveedor;
