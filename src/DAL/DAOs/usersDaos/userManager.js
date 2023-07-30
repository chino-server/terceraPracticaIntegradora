
import { userModel } from "../../MongoDB/models/users.model.js";

export default class UserManager {
  async addUser(obj) {
    const newUser = await userModel.create(obj);
    return newUser;
  }

  async getUser(user) {
    const { email } = user;
    console.log('aqui llega', email)
    const userEncontrado = await userModel.findOne({ email });
    return userEncontrado;
  }


  async getEmail(email) {
    try {
      const userEncontrado = await userModel.findOne({ email });
      return userEncontrado;
      
    } catch (error) {
      throw new Error ('Usuario no encontrado')
    }
  }
}
