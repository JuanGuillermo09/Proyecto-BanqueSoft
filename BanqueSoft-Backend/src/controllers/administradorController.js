import Administrador from "../models/administradorModel.js";
import { signToken } from '../config/jwtConfig.js'; // Asegúrate de importar correctamente
import bcrypt from 'bcrypt';

// Crear un nuevo Administrador
export const createAdministrador = async (req, res) => {
  try {
    const administrador = await Administrador.create(req.body);
    res.status(201).json(administrador);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Obtener todos los Administradorop
export const getAllAdministrador = async (req, res) => {
  try {
    const administrador = await Administrador.findAll();
    res.json(administrador);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener un Administrador por ID
export const getAdministradorById = async (req, res) => {
  try {
    const administrador = await Administrador.findByPk(req.params.id);
    if (!administrador)
      return res.status(404).json({ message: "Administrador no encontrado" });
    res.json(administrador);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar un Administrador
export const updateAdministrador = async (req, res) => {
  try {
    const administrador = await Administrador.findByPk(req.params.id);
    if (!administrador)
      return res.status(404).json({ message: "Administrador no encontrado" });
    await administrador.update(req.body);
    res.json(administrador);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Eliminar un Administrador
export const deleteAdministrador = async (req, res) => {
  try {
    const administrador = await Administrador.findByPk(req.params.id);
    if (!administrador)
      return res.status(404).json({ message: "Administrador no encontrado" });
    await administrador.destroy();
    res.json({ message: "Administrador eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Cambiar estado de Administrador (activo/inactivo)
export const cambiarEstadoAdministrador = async (req, res) => {
  try {
    const AdministradoroId = req.params.id;
    const estadoNuevo = req.body.Estado; // 1 = Activo, 0 = Inactivo

    const administrador = await Administrador.findByPk(AdministradoroId);
    if (!administrador) {
      return res.status(404).json({ message: "Administrador no encontrado" });
    }

    administrador.Estado = estadoNuevo;
    await administrador.save();

    res.json({ message: "Estado del Administrador actualizado correctamente" });
  } catch (error) {
    console.error("Error al actualizar estado del Administrador:", error);
    res.status(500).json({ message: error.message });
  }
};


export const loginAdministrador = async (req, res) => {
  try {
    // Registrar la identificación proporcionada
    console.log('Identificación proporcionada:', req.body.Identificacion);
    
    // Buscar el administrador en la base de datos
    const administrador = await Administrador.findOne({ where: { Identificacion: req.body.Identificacion } });
    
    // Registrar el administrador encontrado (o null)
    console.log('Administrador encontrado:', administrador);

    // Verificar si el administrador existe
    if (!administrador) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    // Comparar la contraseña proporcionada con la almacenada
    const isPasswordValid = await bcrypt.compare(req.body.Contrasenia, administrador.Contrasenia);
    
    // Registrar la contraseña almacenada para depuración (asegúrate de que esto no exponga información sensible en producción)
    console.log('Contraseña almacenada:', administrador.Contrasenia);

    // Verificar si la contraseña es válida
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    // Crear y firmar un token JWT con la identificación del administrador
    const payload = { administradorId: administrador.Cod_administrador }; // Cambia a Cod_administrador si es necesario
    const token = signToken(payload, '1h'); // Expira en 1 hora

       // Enviar el token y el nombre en la respuesta
       res.json({
        token,
        adminName: administrador.Nombre, // Asegúrate de enviar el nombre del Cod_administrador
        adminId: administrador.Cod_administrador, // Devuelve el Cod_administrador del Cod_administrador
      });
  
  } catch (error) {
    console.error('Error en el inicio de sesión:', error); // Registrar el error
    res.status(500).json({ message: 'Error en el servidor' });
  }
};