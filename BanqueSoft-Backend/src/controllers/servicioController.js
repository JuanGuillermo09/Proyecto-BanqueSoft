import Servicio from "../models/servicioModel.js";

// Crear un nuevo servicio
export const createServicio = async (req, res) => {
  try {
    const servicio = await Servicio.create(req.body);
    res.status(201).json(servicio);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Obtener todos los servicio
export const getAllServicio = async (req, res) => {
  try {
    const servicio = await Servicio.findAll();
    res.json(servicio);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener un servicio por ID
export const getServicioById = async (req, res) => {
  try {
    const servicio = await Servicio.findByPk(req.params.id);
    if (!servicio)
      return res.status(404).json({ message: "Servicio no encontrado" });
    res.json(servicio);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar un servicio
export const updateServicio = async (req, res) => {
  try {
    const servicio = await Servicio.findByPk(req.params.id);
    if (!servicio)
      return res.status(404).json({ message: "Servicio no encontrado" });
    await servicio.update(req.body);
    res.json(servicio);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Eliminar un servicio
export const deleteServicio = async (req, res) => {
  try {
    const servicio = await Servicio.findByPk(req.params.id);
    if (!servicio)
      return res.status(404).json({ message: "Servicio no encontrado" });
    await servicio.destroy();
    res.json({ message: "Servicio eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Cambiar estado de servicio (activo/inactivo)
export const cambiarEstadoServicio = async (req, res) => {
  try {
    const ServicioId = req.params.id;
    const estadoNuevo = req.body.Estado; // 1 = Activo, 0 = Inactivo

    const servicio = await Servicio.findByPk(ServicioId);
    if (!servicio) {
      return res.status(404).json({ message: "Servicio no encontrado" });
    }

    servicio.Estado = estadoNuevo;
    await servicio.save();

    res.json({ message: "Estado del servicio actualizado correctamente" });
  } catch (error) {
    console.error("Error al actualizar estado del servicio:", error);
    res.status(500).json({ message: error.message });
  }
};
