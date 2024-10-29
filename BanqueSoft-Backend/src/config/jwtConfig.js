import jwt from "jsonwebtoken";
// src/config/passwordConfig.js
import bcrypt from 'bcrypt';

const secret = "<your-secret-key>"; // Reemplaza con tu clave secreta

// Función para firmar el token
export const signToken = (payload, expirationTime) => {
  return jwt.sign(payload, secret, { expiresIn: expirationTime });
};

// Función para verificar el token
export const verifyToken = (token) => {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    return null; // Retorna null si hay un error en la verificación
  }
};

// Función para generar un token de recuperación (expira en 1 hora)
export const generateRecoveryToken = (payload) => {
  return jwt.sign(payload, secret, { expiresIn: "1h" });
};



export const hashPassword = async (password) => {
  const saltRounds = 10; // Cantidad de rondas de sal para encriptar
  return await bcrypt.hash(password, saltRounds);
};
