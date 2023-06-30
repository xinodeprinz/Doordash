import { Router } from "express";
import { login, logout, register } from "./controllers/AuthController.js";
import {
  createErrand,
  errands,
  popularErrands,
} from "./controllers/ErrandController.js";
import {
  deposit,
  transactions,
  withdraw,
} from "./controllers/PaymentController.js";
import {
  getUser,
  popularVendorsInClientsLocation,
  updatePhoto,
  updateUser,
  vendorsByAddress,
} from "./controllers/UserController.js";
import verifyToken from "./middlewares/verifyToken.js";

const router = Router();

// Auth Routes
router.post("/register", register);
router.post("/login", login);
router.get("/logout", verifyToken, logout);

// User Routes
router.get("/user", verifyToken, getUser);
router.patch("/photo", verifyToken, updatePhoto);
router.patch("/user/update", verifyToken, updateUser);
router.get("/popular-vendors", verifyToken, popularVendorsInClientsLocation);

// Errand Routes
router.post("/errands/create", createErrand);
router.get("/popular-errands", verifyToken, popularErrands);
router.get("/errands", verifyToken, errands);
router.get("/vendors/:address", verifyToken, vendorsByAddress);

// Payment and Transactions
router.get("/transactions", verifyToken, transactions);
router.post("/deposit", verifyToken, deposit);
router.post("/withdraw", verifyToken, withdraw);

export default router;
