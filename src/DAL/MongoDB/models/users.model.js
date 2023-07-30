import mongoose from "mongoose";

export const ROL_USER = "user";
export const ROL_ADMIN = "admin";

const usersSchema = new mongoose.Schema({
  first_name: {
    type: String,
    require: true,
  },
  last_name: {
    type: String,
    require: true,
  },

  email: {
    type: String,
    require: true,
    unique: true,
  },
  age: {
    type: Number,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  cart: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Carts",
  },
  role:{
    type: String,
    default: ROL_USER
  }
});

export const userModel = mongoose.model("Users", usersSchema);
