import express from "express";
import { createCard, getCards,deleteCard } from "../controllers/cardController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

/*
 👑 ADMIN ONLY
 Create card
*/
router.post(
  "/",
  protect,
  authorizeRoles("admin"),
  createCard
);

/*
 🔓 SHARED (ADMIN + USER)
 Get cards
*/
router.get(
  "/",
  protect,
  getCards
);
router.delete("/:id", protect, authorizeRoles("admin"), deleteCard);

export default router;
