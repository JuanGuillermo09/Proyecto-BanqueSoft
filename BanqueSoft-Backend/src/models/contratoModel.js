import { DataTypes } from "sequelize";
import sequelize from "../config/dataBase.js";
import Administrador from "./administradorModel.js";
import Cliente from "./clienteModel.js";
import Menaje from "./menajeModel.js";
import TipoDeEvento from "./tipoDeEventoModel.js";

const Contrato = sequelize.define(
  "tbl_contrato",
  {
    Cod_contrato: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Fecha_contrato: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    Fecha_evento: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    Hora_evento: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    valor_neto: {
      type: DataTypes.DECIMAL(10, 0),
      allowNull: true,
    },
    valor_pagar: {
      type: DataTypes.DECIMAL(10, 0),
      allowNull: true,
    },
    Número_invitados: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    Forma_pago: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    Cod_tipo_evento: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: TipoDeEvento,
        key: "Cod_tipo_evento",
      },
    },
    Identificacion: {
      type: DataTypes.STRING(13),
      allowNull: true,
    },
    Cod_Menaje: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Menaje,
        key: "Cod_Menaje",
      },
    },
    Cod_administrador: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Administrador,
        key: "Cod_administrador",
      },
    },
    Cod_cliente: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Cliente,
        key: "Cod_cliente",
      },
    },
    Estado_contrato: {
      type: DataTypes.TINYINT,
      defaultValue: 1,
    },
  },
  {
    tableName: "tbl_contrato",
    timestamps: false, // Desactiva createdAt y updatedAt
  }
);

// Establece la relación entre Contrato y TipoDeEvento
Contrato.belongsTo(TipoDeEvento, {
  foreignKey: "Cod_tipo_evento",
  targetKey: "Cod_tipo_evento",
});

// Establece la relación entre Contrato y Menaje
Contrato.belongsTo(Menaje, {
  foreignKey: "Cod_Menaje",
  targetKey: "Cod_Menaje",
});

// Establece la relación entre Contrato y Administrador
Contrato.belongsTo(Administrador, {
  foreignKey: "Cod_administrador",
  targetKey: "Cod_administrador",
});

// Establece la relación entre Contrato y Cliente
Contrato.belongsTo(Cliente, {
  foreignKey: "Cod_cliente",
  targetKey: "Cod_cliente",
});

// Sincroniza el modelo con la base de datos
sequelize
  .sync()
  .then(() =>
    console.log("Contrato table has been created, if one doesn't exist")
  )
  .catch((error) => console.error("This error occurred:", error));

export default Contrato;
