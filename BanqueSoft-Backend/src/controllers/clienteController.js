import bcrypt from "bcrypt";
import { signToken } from "../config/jwtConfig.js"; // Asegúrate de importar correctamente
import Cliente from "../models/clienteModel.js";

export const createCliente = async (req, res) => {
  try {
    const cliente = await Cliente.create(req.body);
    res.status(201).json(cliente);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Obtener todos los Clienteop
export const getAllCliente = async (req, res) => {
  try {
    const cliente = await Cliente.findAll();
    res.json(cliente);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener un Cliente por ID
export const getClienteById = async (req, res) => {
  try {
    const cliente = await Cliente.findByPk(req.params.id);
    if (!cliente)
      return res.status(404).json({ message: "Cliente no encontrado" });
    res.json(cliente);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar un Cliente
export const updateCliente = async (req, res) => {
  try {
    const cliente = await Cliente.findByPk(req.params.id);
    if (!cliente)
      return res.status(404).json({ message: "Cliente no encontrado" });
    await cliente.update(req.body);
    res.json(cliente);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Eliminar un Cliente
export const deleteCliente = async (req, res) => {
  try {
    const cliente = await Cliente.findByPk(req.params.id);
    if (!cliente)
      return res.status(404).json({ message: "Cliente no encontrado" });
    await cliente.destroy();
    res.json({ message: "Cliente eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const loginCliente = async (req, res) => {
  try {
    // Registrar la identificación proporcionada
    console.log("Identificación proporcionada:", req.body.Identificacion);

    // Buscar el cliente en la base de datos
    const cliente = await Cliente.findOne({
      where: { Identificacion: req.body.Identificacion },
    });

    // Registrar el cliente encontrado (o null)
    console.log("Cliente encontrado:", cliente);

    if (!cliente) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    // Comparar la contraseña proporcionada con la almacenada
    const isPasswordValid = await bcrypt.compare(
      req.body.Contrasenia,
      cliente.Contrasenia
    );

    // Registrar la contraseña almacenada para depuración (asegúrate de que esto no exponga información sensible en producción)
    console.log("Contraseña almacenada:", cliente.Contrasenia);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    // Crear y firmar un token JWT con la identificación del cliente
    const payload = { clienteId: cliente.Cod_cliente }; // Cambia a Cod_cliente si es necesario
    const token = signToken(payload, "1h"); // Expira en 1 hora

    // Enviar el token y el nombre del cliente en la respuesta
    res.json({
      token,
      clientName: cliente.Nombre, // Devuelve el nombre del cliente
      clientId: cliente.Cod_cliente, // Devuelve el Cod_cliente del cliente
    });
  } catch (error) {
    console.error("Error en el inicio de sesión:", error); // Registrar el error
    res.status(500).json({ message: "Error en el servidor" });
  }
};
