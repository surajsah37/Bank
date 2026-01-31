import express from "express";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";
import {
  deleteUser,
  deleteCard,
   getAllUsers,
  getAllCards
} from "../controllers/adminController.js";

const router = express.Router();

// DELETE USER
router.delete(
  "/user/:id",
  protect,
  authorizeRoles("admin"),
  deleteUser
);

// DELETE CARD
router.delete(
  "/card/:id",
  protect,
  authorizeRoles("admin"),
  deleteCard
);
router.get(
  "/users",
  protect,
  authorizeRoles("admin"),
  getAllUsers
);

export default router;
