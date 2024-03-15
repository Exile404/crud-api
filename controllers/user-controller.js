import User from "../models/user-model.js";
import createError from "../utils/createError.js";
import bcrypt from "bcrypt";

export const createUser = async (req, res, next) => {
    try {
      const hash = bcrypt.hashSync(req.body.password, 5);
      const newUser = new User({
        ...req.body,
        password: hash,
      });
      await newUser.save();
      res.status(201).send("User has been created.");
    } catch (err) {
      next(err);
    }
  };

export const getAllUsers = async (req, res, next) => {
    const users = await User.find();
  
    res.status(200).send(users);
  };
export const getUser = async (req, res, next) => {
    const user = await User.findById(req.params.id);
  
    res.status(200).send(user);
  };

export const deleteUser = async (req, res, next) => {
  const user = await User.findById(req.params.id);

  
  await User.findByIdAndDelete(req.params.id);
  res.status(200).send("User Deleted.");
};


export const updateUser = async (req, res, next) => {
  const hash = bcrypt.hashSync(req.body.password, 5);

  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, {
      
      username:req.body.username,
      password: hash,

    }, { new: true });

    res.status(200).send(updatedUser);
  } catch (error) {
    next(createError(500, "Internal Server Error"));
  }
};