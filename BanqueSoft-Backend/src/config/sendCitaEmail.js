import nodemailer from "nodemailer";


const sendCitaConfirmation = async (emailCliente, nombreCliente, fechaCita, hora) => {
    const transporter = nodemailer.createTransport({
        service: "gmail", // Usar el servicio de Gmail
        auth: {
          user: "banquesoft@gmail.com", // Tu dirección de Gmail
          pass: "mwcp irsh hjmh oaeg", // Usa la contraseña de aplicación aquí
      }
    });
  
    const mailOptions = {
      from: 'tu_correo@gmail.com',
      to: emailCliente,
      subject: 'Confirmación de Cita',
      html: `
        <h1>Hola, ${nombreCliente}!</h1>
        <p>Tu cita está confirmada para el ${fechaCita} Hora ${hora} .</p>
        <p>¡Gracias por confiar en nosotros!</p>
      `
    };
  
    try {
      await transporter.sendMail(mailOptions);
      console.log('Correo de confirmación enviado');
    } catch (error) {
      console.error('Error al enviar el correo:', error);
      throw new Error('Error al enviar el correo de confirmación');
    }
  };
  
  
  export default sendCitaConfirmation;