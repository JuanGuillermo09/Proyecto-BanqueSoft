import Menaje from "../models/menajeModel.js";

// Crear un nuevo menaje
export const createmenaje = async (req, res) => {
  try {
    const menaje = await Menaje.create(req.body);
    res.status(201).json(menaje);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Obtener todos los menajes
export const getAllmenaje = async (req, res) => {
  try {
    const menajes = await Menaje.findAll();
    res.json(menajes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener un menaje por ID
export const getmenajeById = async (req, res) => {
  try {
    const menaje = await Menaje.findByPk(req.params.id);
    if (!menaje)
      return res.status(404).json({ message: "Menaje no encontrado" });
    res.json(menaje);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar un menaje
export const updatemenaje = async (req, res) => {
  try {
    const menaje = await Menaje.findByPk(req.params.id);
    if (!menaje)
      return res.status(404).json({ message: "Menaje no encontrado" });
    await menaje.update(req.body);
    res.json(menaje);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Eliminar un menaje
export const deletemenaje = async (req, res) => {
  try {
    const menaje = await Menaje.findByPk(req.params.id);
    if (!menaje)
      return res.status(404).json({ message: "Menaje no encontrado" });
    await menaje.destroy();
    res.json({ message: "Menaje eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Cambiar estado de menaje (activo/inactivo)
export const cambiarEstadoMenaje = async (req, res) => {
  try {
    const MenajeId = req.params.id;
    const estadoNuevo = req.body.Estado; // 1 = Activo, 0 = Inactivo

    const menaje = await Menaje.findByPk(MenajeId);
    if (!menaje) {
      return res.status(404).json({ message: "Menaje no encontrado" });
    }

    menaje.Estado = estadoNuevo;
    await menaje.save();

    res.json({ message: "Estado del menaje actualizado correctamente" });
  } catch (error) {
    console.error("Error al actualizar estado del menaje:", error);
    res.status(500).json({ message: error.message });
  }
};

