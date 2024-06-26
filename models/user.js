import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

/* const userSchema = mongoose.Schema({
  nome: {
    type: String,
    require: true,
  },
  cognome: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
}); */

export const User = mongoose.model("User", userSchema);
