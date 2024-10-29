import { DataTypes } from "sequelize";
import sequelize from "../config/dataBase.js";
import Proveedor from "./proveedorModel.js";

// Define el modelo de Menaje sin timestamps
const Menaje = sequelize.define(
  "tbl_menaje",
  {
    Cod_Menaje: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      primaryKey: true,
      autoIncrement: true,
    },
    Nombre_Menaje: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Descripcion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Cod_Proveedor: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Proveedor, // Hace referencia al modelo Proveedor
        key: "Cod_proveedor", // Columna de referencia en la tabla Proveedor
      },
    },
    Estado: {
      type: DataTypes.TINYINT,
      allowNull: true,
      defaultValue: 1,
    },
  },
  {
    tableName: "tbl_menaje",
    timestamps: false, // Desactiva createdAt y updatedAt
  }
);

// Establece la relación entre Menaje y Proveedor
Menaje.belongsTo(Proveedor, {
  foreignKey: "Cod_proveedor",
  targetKey: "Cod_proveedor",
});

// Sincroniza el modelo con la base de datos
sequelize
  .sync()
  .then(() =>
    console.log("Menaje table has been created, if one doesn't exist")
  )
  .catch((error) => console.error("This error occurred:", error));

export default Menaje;
