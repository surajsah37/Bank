import User from "../models/User.js";

export const createUser = async (req, res) => {
  const { name, email, balance } = req.body;

  const user = await User.create({
    name,
    email,
    balance,
  });

  res.status(201).json(user);
};

export const getUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};
