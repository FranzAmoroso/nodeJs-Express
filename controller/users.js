import { User } from "../models/user.js";
import mongoose from "mongoose";

export const readAllUser = async (req, res) => {
  const users = await User.find();

  try {
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const insertUser = async (req, res) => {
  const newUser = new User(req.body);

  try {
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const readUserByID = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ message: "id non conforme" });

  try {
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const data = { ...req.body };

  if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({message: 'id non valido'});
  try{
    const user = await User.findByIdAndUpdate(id, data, {new: true});
    res.status(200).json(user)
  } catch(error) {
    res.status(404).json({message:error.message})
  }
};

export const deleteUser = async (req, res) => {
  const { id: _id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).json({ message: "id non conforme" });
  try {
    await User.findByIdAndDelete(_id);
    res.status(200).json({ message: "Utente eliminato con successo !" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
