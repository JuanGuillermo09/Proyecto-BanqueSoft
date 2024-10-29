import PrestadorServicio from "../models/prestadorServicioModel.js";

// Crear un nuevo PrestadorServicio
export const createPrestadorServicio = async (req, res) => {
  try {
    const prestadorServicio = await PrestadorServicio.create(req.body);
    res.status(201).json(prestadorServicio);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Obtener todos los PrestadorServiciop
export const getAllPrestadorServicio = async (req, res) => {
  try {
    const prestadorServicio = await PrestadorServicio.findAll();
    res.json(prestadorServicio);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener un PrestadorServicio por ID
export const getPrestadorServicioById = async (req, res) => {
  try {
    const prestadorServicio = await PrestadorServicio.findByPk(req.params.id);
    if (!prestadorServicio)
      return res.status(404).json({ message: "PrestadorServicio no encontrado" });
    res.json(prestadorServicio);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar un PrestadorServicio
export const updatePrestadorServicio = async (req, res) => {
  try {
    const prestadorServicio = await PrestadorServicio.findByPk(req.params.id);
    if (!prestadorServicio)
      return res.status(404).json({ message: "PrestadorServicio no encontrado" });
    await prestadorServicio.update(req.body);
    res.json(prestadorServicio);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Eliminar un PrestadorServicio
export const deletePrestadorServicio = async (req, res) => {
  try {
    const prestadorServicio = await PrestadorServicio.findByPk(req.params.id);
    if (!prestadorServicio)
      return res.status(404).json({ message: "PrestadorServicio no encontrado" });
    await prestadorServicio.destroy();
    res.json({ message: "Prestador Servicio eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Cambiar estado de PrestadorServicio (activo/inactivo)
export const cambiarEstadoPrestadorServicio = async (req, res) => {
  try {
    const PrestadorServicioId = req.params.id;
    const estadoNuevo = req.body.Estado; // 1 = Activo, 0 = Inactivo

    const prestadorServicio = await PrestadorServicio.findByPk(PrestadorServicioId);
    if (!prestadorServicio) {
      return res.status(404).json({ message: "PrestadorServicio no encontrado" });
    }

    prestadorServicio.Estado = estadoNuevo;
    await prestadorServicio.save();

    res.json({ message: "Estado del PrestadorServicio actualizado correctamente" });
  } catch (error) {
    console.error("Error al actualizar estado del PrestadorServicio:", error);
    res.status(500).json({ message: error.message });
  }
};
