import { DataTypes } from "sequelize";
import sequelize from "../config/dataBase.js";

// Define el modelo de TipoDeEvento sin timestamps
const TipoDeEvento = sequelize.define(
  "tbl_tipo_evento",
  {
    Cod_tipo_evento: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      primaryKey: true,
      autoIncrement: true,
    },
    Nombre: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },

    Estado: {
      type: DataTypes.TINYINT,
      allowNull: true,
      defaultValue: 1,
    },
  },
  {
    tableName: "tbl_tipo_evento",
    timestamps: false, // Desactiva createdAt y updatedAt
  }
);

// Sincroniza el modelo con la base de datos
sequelize
  .sync()
  .then(() =>
    console.log("Tipo de evento table has been created, if one doesn't exist")
  )
  .catch((error) => console.error("This error occurred:", error));

export default TipoDeEvento;
