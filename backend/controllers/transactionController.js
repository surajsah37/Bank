import Transaction from "../models/Transaction.js";
import User from "../models/User.js";

export const createTransaction = async (req, res) => {
  try {
    const { userId, amount, type, description } = req.body;

    // Find user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update balance
    if (type === "income") {
      user.balance += Number(amount);
    } else {
      user.balance -= Number(amount);
    }

    await user.save();

    // Save transaction
    const transaction = await Transaction.create({
      userId,
      amount,
      type,
      description,
    });

    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



/*
export const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find()
      .populate("userId", "name email");
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
*/




export const getTransactions = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = 5;
    const type = req.query.type;
    const search = req.query.search;

    const query = { userId: req.user._id };

    if (type && type !== "all") {
      query.type = type;
    }

    if (search) {
      query.description = { $regex: search, $options: "i" };
    }

    const total = await Transaction.countDocuments(query);

    const transactions = await Transaction.find(query)
      .sort({ createdAt: -1 })
      // .skip((page - 1) * limit)
      // .limit(limit);

      console.log('transaction ka data hai ye')
      console.log(transactions)
    res.json({
      transactions,
      totalPages: Math.ceil(total / limit),
      page,
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
