import {
  generateRecoveryToken,
  hashPassword,
  verifyToken,
} from "./config/jwtConfig.js";
import sendEmail from "./config/sendContraseñaEmail.js";
import Administrador from "./models/administradorModel.js";
import Cliente from "./models/clienteModel.js";

export const recuperarContrasenia = async (req, res) => {
  const { Identificacion } = req.body;

  try {
    let usuario = await Cliente.findOne({
      where: { Identificacion },
    });

    if (!usuario) {
      usuario = await Administrador.findOne({
        where: { Identificacion },
      });
    }

    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    console.log("Usuario encontrado:", usuario);

    // Verifica que el correo no esté vacío
    if (!usuario.Email) {
      return res
        .status(400)
        .json({ message: "El correo electrónico no está disponible" });
    }

    const token = generateRecoveryToken({
      id: usuario.Cod_cliente || usuario.Cod_administrador,
    });
    console.log("Enviando correo a:", usuario.Email); // Aquí se imprime el correo

    await sendEmail(usuario.Email, token);

    return res.status(200).json({ message: "Correo de recuperación enviado" });
  } catch (error) {
    console.error("Error en recuperación de contraseña:", error);
    return res.status(500).json({ message: "Error en el servidor" });
  }
};

export const cambiarContrasenia = async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    const decoded = verifyToken(token);
    console.log("Decoded token:", decoded); // Para verificar el contenido del token

    if (!decoded || !decoded.id) {
      return res.status(400).json({ message: "Token inválido" });
    }

    let usuario = await Cliente.findByPk(decoded.id);
    if (!usuario) {
      usuario = await Administrador.findByPk(decoded.id);
    }

    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Hashear la nueva contraseña
    usuario.Contrasenia = newPassword; // Esto debería ser solo para el texto plano
    usuario.Encriptado = await hashPassword(newPassword); // Esto guarda el hash

    await usuario.save();

    return res
      .status(200)
      .json({ message: "Contraseña actualizada exitosamente" });
  } catch (error) {
    console.error("Error al cambiar la contraseña:", error);
    return res.status(500).json({ message: "Error en el servidor" });
  }
};
