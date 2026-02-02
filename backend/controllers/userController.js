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
export const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);

    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
};
export const getBalance = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    res.json({
      balance: user.balance
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching balance" });
  }
};
