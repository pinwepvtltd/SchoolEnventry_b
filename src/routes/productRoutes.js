import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
  createProduct,
  getProducts,
  searchProducts,
  updateStock,
  updateProduct,
  deleteProduct
} from "../controllers/productController.js";

const router = express.Router();

router.route("/")
  .get(protect, getProducts)
  .post(protect, createProduct);

router.get("/getAllProduct", protect, getProducts);
router.post("/addProduct", protect, createProduct);
router.get("/search", protect, searchProducts);
router.put("/updateStock/:id", protect, updateStock);

router.route("/:id")
  .put(protect, updateProduct)
  .delete(protect, deleteProduct);

export default router;