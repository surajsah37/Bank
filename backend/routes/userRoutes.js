import express from "express";
import { createUser, getUsers } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";
const router = express.Router();

router.post("/", createUser);
router.get("/", getUsers);
router.post("/", protect, createUser);
router.post(
  "/",
  protect,
  authorizeRoles("admin"),
  createUser
);
 
router.get(
  "/",
  protect,
  getUsers
);
export default router;
