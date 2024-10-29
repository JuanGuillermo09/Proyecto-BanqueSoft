import Promocion from "../models/promocionModel.js";

// Crear un nuevo promocion
export const createpromocion = async (req, res) => {
  try {
    const promocion = await Promocion.create(req.body);
    res.status(201).json(promocion);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Obtener todos los proocion
export const getAllpromocion = async (req, res) => {
  try {
    const proocion = await Promocion.findAll();
    res.json(proocion);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener un promocion por ID
export const getpromocionById = async (req, res) => {
  try {
    const promocion = await Promocion.findByPk(req.params.id);
    if (!promocion)
      return res.status(404).json({ message: "Promocion no encontrado" });
    res.json(promocion);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar un promocion
export const updatepromocion = async (req, res) => {
  try {
    const promocion = await Promocion.findByPk(req.params.id);
    if (!promocion)
      return res.status(404).json({ message: "Promocion no encontrado" });
    await promocion.update(req.body);
    res.json(promocion);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Eliminar un promocion
export const deletepromocion = async (req, res) => {
  try {
    const promocion = await Promocion.findByPk(req.params.id);
    if (!promocion)
      return res.status(404).json({ message: "Promocion no encontrado" });
    await promocion.destroy();
    res.json({ message: "Promocion eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Cambiar estado de promocion (activo/inactivo)
export const cambiarEstadoPromocion = async (req, res) => {
  try {
    const promocionId = req.params.id;
    const estadoNuevo = req.body.Estado; // 1 = Activo, 0 = Inactivo

    const promocion = await Promocion.findByPk(promocionId);
    if (!promocion) {
      return res.status(404).json({ message: "Promocion no encontrado" });
    }

    promocion.Estado = estadoNuevo;
    await promocion.save();

    res.json({ message: "Estado del promocion actualizado correctamente" });
  } catch (error) {
    console.error("Error al actualizar estado del promocion:", error);
    res.status(500).json({ message: error.message });
  }
};
