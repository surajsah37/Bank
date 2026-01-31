import express from "express";
import {
  registerAdmin,
  loginAdmin,
} from "../controllers/authController.js";
import { loginUser } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", registerAdmin); // run once
router.post("/login", loginAdmin);
router.post("/user-login", loginUser);
export default router;