import express from "express";
import {
  createUser,
  loginUser,
  logoutUser,
  getAllUsers,
  getCurrentUserProfile,
  updateCurrentUserProfile,
  deleteUserById,
  getUserById,
  updateUserById,
} from "../controllers/userController.js";
const router = express.Router();
import { authenticate, admin } from "../middlewares/authMiddleware.js";

router.route("/").get(authenticate, admin, getAllUsers);
router.route("/register").post(createUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

router
  .route("/profile")
  .get(authenticate, getCurrentUserProfile)
  .put(authenticate, updateCurrentUserProfile);

// from admin panel
router
  .route("/:id")
  .delete(authenticate, admin, deleteUserById)
  .get(authenticate, admin, getUserById)
  .put(authenticate, admin, updateUserById);

export default router;
