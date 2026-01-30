import express from "express";
import { createCard, getCards } from "../controllers/cardController.js";
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

export default router;
