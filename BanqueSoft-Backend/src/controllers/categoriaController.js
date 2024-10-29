import Categoria from "../models/categoriaModel.js";

// Crear un nuevo categoria
export const createcategoria = async (req, res) => {
  try {
    const categoria = await Categoria.create(req.body);
    res.status(201).json(categoria);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Obtener todos los categoria
export const getAllcategoria = async (req, res) => {
  try {
    const categoria = await Categoria.findAll();
    res.json(categoria);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener un categoria por ID
export const getcategoriaById = async (req, res) => {
  try {
    const categoria = await Categoria.findByPk(req.params.id);
    if (!categoria)
      return res.status(404).json({ message: "Categoria no encontrado" });
    res.json(categoria);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar un categoria
export const updatecategoria = async (req, res) => {
  try {
    const categoria = await Categoria.findByPk(req.params.id);
    if (!categoria)
      return res.status(404).json({ message: "Categoria no encontrado" });
    await categoria.update(req.body);
    res.json(categoria);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Eliminar un categoria
export const deletecategoria = async (req, res) => {
  try {
    const categoria = await Categoria.findByPk(req.params.id);
    if (!categoria)
      return res.status(404).json({ message: "Categoria no encontrado" });
    await categoria.destroy();
    res.json({ message: "Categoria eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Cambiar estado de categoria (activo/inactivo)
export const cambiarEstadoCategoria = async (req, res) => {
  try {
    const CategoriaId = req.params.id;
    const estadoNuevo = req.body.Estado; // 1 = Activo, 0 = Inactivo

    const categoria = await Categoria.findByPk(CategoriaId);
    if (!categoria) {
      return res.status(404).json({ message: "Categoria no encontrado" });
    }

    categoria.Estado = estadoNuevo;
    await categoria.save();

    res.json({ message: "Estado del categoria actualizado correctamente" });
  } catch (error) {
    console.error("Error al actualizar estado del categoria:", error);
    res.status(500).json({ message: error.message });
  }
};
