import Card from "../models/Card.js";

export const createCard = async (req, res) => {
  try {
    const { userId, cardNumber, cardType, balance } = req.body;

    const card = await Card.create({
      userId,
      cardNumber,
      cardType,
      balance,
    });

    res.status(201).json(card);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCards = async (req, res) => {
  try {
    const cards = await Card.find().populate("userId", "name email");
    res.json(cards);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};