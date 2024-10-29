import { DataTypes } from "sequelize";
import sequelize from "../config/dataBase.js";
import Categoria from "../models/categoriaModel.js";
import PrestadorServicio from "./prestadorServicioModel.js";

// Define el modelo de Servicio sin timestamps

const Servicio = sequelize.define(
  "tbl_servicio",
  {
    Cod_servicio: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      primaryKey: true,
      autoIncrement: true,
    },
    Nombre: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    Descripcion: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    Adicionales: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    Obligatorio: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    Imagen: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    valor: {
      type: DataTypes.DECIMAL(18, 0),
      allowNull: true,
    },
    Sn_cotizar: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    Cod_categoria: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Categoria, // Asegúrate de que este nombre sea correcto
        key: "Cod_categoria",
      },
    },
    Cod_prestador_servicio: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: PrestadorServicio, // Asegúrate de que este nombre sea correcto
        key: "Cod_prestador_servicio",
      },
    },
    Estado: {
      type: DataTypes.TINYINT,
      allowNull: true,
      defaultValue: 1,
    },
  },
  {
    tableName: "tbl_servicio",
    timestamps: false, // Cambia a true si quieres que Sequelize maneje createdAt y updatedAt
  }

);

  // Establece la relación entre Servicio y Categoria
  Servicio.belongsTo(Categoria, {
    foreignKey: "Cod_categoria",
    targetKey: "Cod_categoria",
  });
  
    // Establece la relación entre Servicio y PrestadorServicio
    Servicio.belongsTo(PrestadorServicio, {
        foreignKey: "Cod_prestador_servicio",
        targetKey: "Cod_prestador_servicio",
      });
      
// Sincroniza el modelo con la base de datos
sequelize
  .sync()
  .then(() =>
    console.log("Servicio table has been created, if one doesn't exist")
  )
  .catch((error) => console.error("This error occurred:", error));


export default Servicio;