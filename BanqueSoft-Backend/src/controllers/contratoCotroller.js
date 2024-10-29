import Contrato from "../models/contratoModel.js";


// Crear un nuevo contrato
// Crear un nuevo contrato
export const createcontrato = async (req, res) => {
  const { Fecha_evento } = req.body;

  try {
    // Verificar si ya hay un contrato para la fecha especificada
    const contratoExistente = await Contrato.findOne({
      where: { Fecha_evento: Fecha_evento },
    });

    if (contratoExistente) {
      return res.status(400).json({ message: "Lo siento, ya hay un contrato para esa fecha." });
    }

    // Si no existe, crear el nuevo contrato
    const nuevoContrato = await Contrato.create(req.body);
    res.status(201).json(nuevoContrato);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Obtener todos los contratos
export const getAllcontrato = async (req, res) => {
  try {
    const contratos = await Contrato.findAll();
    res.json(contratos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener un contrato por ID
export const getcontratoById = async (req, res) => {
  try {
    const contrato = await Contrato.findByPk(req.params.id);
    if (!contrato)
      return res.status(404).json({ message: "Contrato no encontrado" });
    res.json(contrato);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar un contrato
export const updatecontrato = async (req, res) => {
  try {
    const contrato = await Contrato.findByPk(req.params.id);
    if (!contrato)
      return res.status(404).json({ message: "Contrato no encontrado" });
    await contrato.update(req.body);
    res.json(contrato);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Eliminar un contrato
export const deletecontrato = async (req, res) => {
  try {
    const contrato = await Contrato.findByPk(req.params.id);
    if (!contrato)
      return res.status(404).json({ message: "Contrato no encontrado" });
    await contrato.destroy();
    res.json({ message: "Contrato eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Cambiar estado de contrato (Pago/NoPago)
export const cambiarEstadoContrato = async (req, res) => {
  try {
    const contratoId = req.params.id;
    const estadoNuevo = req.body.Estado_contrato; // 1 = Pago, 0 = No Pago

    const contrato = await Contrato.findByPk(contratoId);
    if (!contrato) {
      return res.status(404).json({ message: "Contrato no encontrado" });
    }

    // Actualiza el estado del contrato
    contrato.Estado_contrato = estadoNuevo; // Asegúrate de que el nombre de la columna sea correcto
    await contrato.save();

    res.json({ message: "Estado del contrato actualizado correctamente" });
  } catch (error) {
    console.error("Error al actualizar estado del contrato:", error);
    res.status(500).json({ message: error.message });
  }
};