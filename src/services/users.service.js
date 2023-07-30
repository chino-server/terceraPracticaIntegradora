import UserManager from "../DAL/DAOs/usersDaos/userManager.js";
import { hashData } from "../utils/utils.js";
import nodemailer from 'nodemailer'
import config from "../config.js";


const userManager = new UserManager();

const transporter = nodemailer.createTransport({
  service:'gmail',
  auth:{
    user: config.gmail_user,
    pass:config.gmail_password
  }
})


export const addUser = async (user) => {
  try {
    const existingUser = await userManager.getUser(user);
    
    if (existingUser) {
        throw new Error("Usuario existente");
    }
    const { password } = user;
    const hashPassword = await hashData(password);
    const newUser = { ...user, password: hashPassword };
    return await userManager.addUser(newUser);
  } catch (error) {
    throw error;
  }
};

export const forgotPassService = async (email) => {
  try {
    const existingEmail = await userManager.getEmail(email);

    if (!existingEmail) {
      return { error: "Usuario no existe" };
    }

    const msj = {
      
        from: 'CODERHOUSE 51125',
        to: email,
        subject: 'Recuperacion de pagina',
        text: 'Prueba',
        html:'<href>http://localhost:8081/recuperarusuario</href>',    
    }
    await transporter.sendMail(msj)
    return { message: "Se ha enviado un enlace para restablecer la contraseña a su correo electrónico." };
  } catch (error) {
    console.error(error);
    throw new Error("Error al procesar la solicitud de recuperación de contraseña.");
  }
};