
import { DataTypes } from "sequelize";
import sequelize from "../config/dataBase.js";

const Cita = sequelize.define(
    "Cita"
    , {
  Cod_cita: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  Fecha: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  Hora: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  Identificacion: {
    type: DataTypes.STRING(13),
    allowNull: true,
  },
  Nombre: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  Estado: {
    type: DataTypes.TINYINT(1),
    defaultValue: 1, // Activo por defecto
  },
  Cod_cliente: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'tbl_cliente', // Nombre de la tabla referenciada
      key: 'Cod_cliente',   // Llave foránea
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',   // Mantener integridad referencial
  },
}, {
  tableName: 'tbl_cita',
  timestamps: false, // Si no estás usando columnas createdAt y updatedAt
});

// Sincroniza el modelo con la base de datos
sequelize
  .sync()
  .then(() =>
    console.log("Cita table has been created, if one doesn't exist")
  )
  .catch((error) => console.error("This error occurred:", error));

export default Cita;
