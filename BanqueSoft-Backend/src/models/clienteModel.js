import { DataTypes } from "sequelize";
import sequelize from "../config/dataBase.js";
import bcrypt from "bcrypt"; // Asegúrate de importar bcrypt

// Define el modelo de Cliente sin timestamps

const Cliente = sequelize.define(
  "tbl_cliente",
  {
    Tipo_documento: {
      type: DataTypes.STRING(13),
      allowNull: true,
      defaultValue: null,
    },
    Cod_cliente: {
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
 
  },
  {
    tableName: "tbl_cliente",
    timestamps: false, // Desactiva createdAt y updatedAt
    hooks: {
      // Hook para cifrar la contraseña antes de crear el cliente
      beforeCreate: async (cliente) => {
        if (cliente.Contrasenia) {
          const salt = await bcrypt.genSalt(10);
          cliente.Contrasenia = await bcrypt.hash(cliente.Contrasenia, salt);
        }
      },
      // Hook para cifrar la contraseña antes de actualizar el cliente
      beforeUpdate: async (cliente) => {
        if (cliente.changed('Contrasenia')) {
          const salt = await bcrypt.genSalt(10);
          cliente.Contrasenia = await bcrypt.hash(cliente.Contrasenia, salt);
        }
      },
    },

  }
);

// Sincroniza el modelo con la base de datos
sequelize
  .sync()
  .then(() =>
    console.log("Cliente table has been created, if one doesn't exist")
  )
  .catch((error) => console.error("This error occurred:", error));

  export default Cliente;