
import sendCitaConfirmation from "../config/sendCitaEmail.js";
import Cita from "../models/citaModel.js";
import Cliente from "../models/clienteModel.js";

// Crear un nuevo cita
  
export const createCita = async (req, res) => {
  try {
    const { Fecha, Hora, Identificacion, Nombre,  } = req.body;

    // Verificar si ya existe una cita en la misma fecha y hora
    const existingCita = await Cita.findOne({
      where: {
        Fecha: Fecha,
        Hora: Hora,
      },
    });

    if (existingCita) {
      return res.status(400).json({ message: "Lo siento, esa hora ya está ocupada. Elija otra." });
    }

    // Buscar el cliente por número de identificación
    const cliente = await Cliente.findOne({
      where: {
        Identificacion: Identificacion, // Aquí usas el número de identificación proporcionado
      },
    });

    // Si no se encuentra el cliente, no se debe permitir crear la cita
    if (!cliente) {
      return res.status(400).json({ message: "No se encontró un cliente con esa identificación." });
    }

       // Agregar el ID del cliente a los datos de la cita
    const citaData = {
      ...req.body,
      Cod_cliente: cliente.Cod_cliente, // Guarda el ID del cliente
    };

    // Crear la cita
    const cita = await Cita.create(citaData);


    // Si se encuentra al cliente, envía el correo de confirmación
    await sendCitaConfirmation(cliente.Email, Nombre, Fecha, Hora);

    res.status(201).json(cita);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Obtener todos los cita
export const getAllCita = async (req, res) => {
  try {
    const cita = await Cita.findAll();
    res.json(cita);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener un cita por ID
export const getCitaById = async (req, res) => {
  try {
    const cita = await Cita.findByPk(req.params.id);
    if (!cita) return res.status(404).json({ message: "Cita no encontrado" });
    res.json(cita);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar un cita
export const updateCita = async (req, res) => {
  try {
    const cita = await Cita.findByPk(req.params.id);
    if (!cita) return res.status(404).json({ message: "Cita no encontrado" });
    await cita.update(req.body);
    res.json(cita);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Eliminar un cita
export const deleteCita = async (req, res) => {
  try {
    const cita = await Cita.findByPk(req.params.id);
    if (!cita) return res.status(404).json({ message: "Cita no encontrado" });
    await cita.destroy();
    res.json({ message: "Cita eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Cambiar estado de cita (activo/inactivo)
export const cambiarEstadoCita = async (req, res) => {
  try {
    const CitaId = req.params.id;
    const estadoNuevo = req.body.Estado; // 1 = Activo, 0 = Inactivo

    const cita = await Cita.findByPk(CitaId);
    if (!cita) {
      return res.status(404).json({ message: "Cita no encontrado" });
    }

    cita.Estado = estadoNuevo;
    await cita.save();

    res.json({ message: "Estado del cita actualizado correctamente" });
  } catch (error) {
    console.error("Error al actualizar estado del cita:", error);
    res.status(500).json({ message: error.message });
  }
};

