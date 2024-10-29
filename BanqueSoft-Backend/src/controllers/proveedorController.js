import Proveedor from "../models/proveedorModel.js";
// Crear un nuevo proveedor
export const createproveedor = async (req, res) => {
  try {
    const proveedor = await Proveedor.create(req.body);
    res.status(201).json(proveedor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Obtener todos los menajes
export const getAllproveedor = async (req, res) => {
  try {
    const menajes = await Proveedor.findAll();
    res.json(menajes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener un proveedor por ID
export const getproveedorById = async (req, res) => {
  try {
    const proveedor = await Proveedor.findByPk(req.params.id);
    if (!proveedor)
      return res.status(404).json({ message: "Proveedor no encontrado" });
    res.json(proveedor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar un proveedor
export const updateproveedor = async (req, res) => {
  try {
    const proveedor = await Proveedor.findByPk(req.params.id);
    if (!proveedor)
      return res.status(404).json({ message: "Proveedor no encontrado" });
    await proveedor.update(req.body);
    res.json(proveedor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Eliminar un proveedor
export const deleteproveedor = async (req, res) => {
  try {
    const proveedor = await Proveedor.findByPk(req.params.id);
    if (!proveedor)
      return res.status(404).json({ message: "Proveedor no encontrado" });
    await proveedor.destroy();
    res.json({ message: "Proveedor eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
 
};


// Cambiar estado de proveedor (activo/inactivo)
export const cambiarEstadoProveedor = async (req, res) => {
  try {
    const proveedorId = req.params.id;
    const estadoNuevo = req.body.Estado; // 1 = Activo, 0 = Inactivo

    const proveedor = await Proveedor.findByPk(proveedorId);
    if (!proveedor) {
      return res.status(404).json({ message: "Proveedor no encontrado" });
    }

    proveedor.Estado = estadoNuevo;
    await proveedor.save();

    res.json({ message: "Estado del proveedor actualizado correctamente" });
  } catch (error) {
    console.error('Error al actualizar estado del proveedor:', error);
    res.status(500).json({ message: error.message });
  }
};