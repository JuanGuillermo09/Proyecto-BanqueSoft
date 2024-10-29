import TipoDeEvento from "../models/tipoDeEventoModel.js";

// Crear un nuevo TipoDeEvento
export const createTipoDeEvento = async (req, res) => {
  try {
    const tipoDeEvento = await TipoDeEvento.create(req.body);
    res.status(201).json(tipoDeEvento);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Obtener todos los tipodeeventop
export const getAllTipoDeEvento = async (req, res) => {
  try {
    const tipodeeventop = await TipoDeEvento.findAll();
    res.json(tipodeeventop);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener un TipoDeEvento por ID
export const getTipoDeEventoById = async (req, res) => {
  try {
    const tipoDeEvento = await TipoDeEvento.findByPk(req.params.id);
    if (!tipoDeEvento)
      return res.status(404).json({ message: "TipoDeEvento no encontrado" });
    res.json(tipoDeEvento);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar un TipoDeEvento
export const updateTipoDeEvento = async (req, res) => {
  try {
    const tipoDeEvento = await TipoDeEvento.findByPk(req.params.id);
    if (!tipoDeEvento)
      return res.status(404).json({ message: "TipoDeEvento no encontrado" });
    await tipoDeEvento.update(req.body);
    res.json(tipoDeEvento);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Eliminar un TipoDeEvento
export const deleteTipoDeEvento = async (req, res) => {
  try {
    const tipoDeEvento = await TipoDeEvento.findByPk(req.params.id);
    if (!tipoDeEvento)
      return res.status(404).json({ message: "TipoDeEvento no encontrado" });
    await tipoDeEvento.destroy();
    res.json({ message: "TipoDeEvento eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Cambiar estado de TipoDeEvento (activo/inactivo)
export const cambiarEstadoTipoDeEvento = async (req, res) => {
  try {
    const TipoDeEventoId = req.params.id;
    const estadoNuevo = req.body.Estado; // 1 = Activo, 0 = Inactivo

    const tipoDeEvento = await TipoDeEvento.findByPk(TipoDeEventoId);
    if (!tipoDeEvento) {
      return res.status(404).json({ message: "TipoDeEvento no encontrado" });
    }

    tipoDeEvento.Estado = estadoNuevo;
    await tipoDeEvento.save();

    res.json({ message: "Estado del TipoDeEvento actualizado correctamente" });
  } catch (error) {
    console.error("Error al actualizar estado del TipoDeEvento:", error);
    res.status(500).json({ message: error.message });
  }
};
