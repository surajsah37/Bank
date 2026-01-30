import express from "express";
import {
  createTransaction,
  getTransactions,
} from "../controllers/transactionController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

/*
 👑 ADMIN ONLY
 Create transaction
*/
router.post(
  "/",
  protect,
  authorizeRoles("admin"),
  createTransaction
);

/*
 🔓 SHARED (ADMIN + USER)
 Get transactions
*/
router.get(
  "/",
  protect,
  getTransactions
);

export default router;
