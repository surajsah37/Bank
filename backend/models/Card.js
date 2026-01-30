import mongoose from "mongoose";

const cardSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    cardNumber: {
      type: String,
      required: true,
    },
    cardType: {
      type: String,
      required: true, // debit / credit
    },
    balance: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Card", cardSchema);
