import nodemailer from "nodemailer";

const sendEmail = async (Email, token) => {
  const transporter = nodemailer.createTransport({
    service: "gmail", // Usar el servicio de Gmail
    auth: {
      user: "banquesoft@gmail.com", // Tu dirección de Gmail
      pass: "mwcp irsh hjmh oaeg", // Usa la contraseña de aplicación aquí
    },
  });

  const mailOptions = {
    from: "banquesoft@gmail.com",
    to: Email,
    subject: "Recuperación de contraseña",
    text: `Para recuperar tu contraseña, sigue el siguiente enlace: http://localhost:4200/cambiar-contrasenia/${token}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Correo enviado exitosamente");
  } catch (error) {
    console.error("Error al enviar el correo:", error);
    throw new Error("Error al enviar el correo de recuperación");
  }
};


export default sendEmail;
