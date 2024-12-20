import express from "express";
const router = express.Router();
import {
  createCategory,
  updateCategory,
  removeCategory,
  listCategory,
  readCategory,
} from "../controllers/categoryController.js";

import { authenticate, admin } from "../middlewares/authMiddleware.js";

router.route("/").post(authenticate, admin, createCategory);
router.route("/:categoryId").put(authenticate, admin, updateCategory);
router.route("/:categoryId").delete(authenticate, admin, removeCategory);

router.route("/categories").get(listCategory);
router.route("/:id").get(readCategory);

export default router;
