import { DataTypes } from "sequelize";
import sequelize from "../config/dataBase.js";
import bcrypt from 'bcrypt';

// Define el modelo de Administrador sin timestamps

const Administrador = sequelize.define(
  "tbl_administrador",
  {
    Tipo_documento: {
      type: DataTypes.STRING(13),
      allowNull: true,
      defaultValue: null,
    },
    Cod_administrador: {
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
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null,
    },
    Contrasenia: {
        type: DataTypes.STRING(100),
        allowNull: true,
        defaultValue: null,
    },
    Encriptado: {
        type: DataTypes.STRING(100),
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
    tableName: "tbl_administrador",
    timestamps: false, // Desactiva createdAt y updatedAt
    hooks: {
      // Hook para cifrar la contraseña antes de crear el administrador
      beforeCreate: async (administrador) => {
        if (administrador.Contrasenia) {
          const salt = await bcrypt.genSalt(10);
          administrador.Contrasenia = await bcrypt.hash(administrador.Contrasenia, salt);
        }

      },
      // Hook para cifrar la contraseña antes de actualizar el administrador
      beforeUpdate: async (administrador) => {
        if (administrador.changed('Contrasenia')) {
          const salt = await bcrypt.genSalt(10);
          administrador.Contrasenia = await bcrypt.hash(administrador.Contrasenia, salt);
        }
      },
    },

  }
);

// Sincroniza el modelo con la base de datos
sequelize
  .sync()
  .then(() =>
    console.log("Administrador table has been created, if one doesn't exist")
  )
  .catch((error) => console.error("This error occurred:", error));

  export default Administrador;