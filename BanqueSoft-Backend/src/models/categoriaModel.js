import { DataTypes } from "sequelize";
import sequelize from "../config/dataBase.js";


// Define el modelo de Menaje sin timestamps
const Categoria = sequelize.define(
  "tbl_categoria",
  {
    Cod_categoria: {
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
    tableName: "tbl_categoria",
    timestamps: false, // Desactiva createdAt y updatedAt
  }
);



// Sincroniza el modelo con la base de datos
sequelize
  .sync()
  .then(() =>
    console.log("Categoria table has been created, if one doesn't exist")
  )
  .catch((error) => console.error("This error occurred:", error));

export default Categoria;
