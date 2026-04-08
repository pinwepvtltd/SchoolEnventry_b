import express from "express";
import {
  getAllSales,
  getDailySales,
  getWeeklySales,
  getMonthlySales,
  getSalesByDate,
  createSale,
  searchSales,
  getSaleByBillNumber,
} from "../controllers/saleController.js";

const router = express.Router();

router.post("/create", createSale);
router.get("/all", getAllSales);
router.get("/daily", getDailySales);
router.get("/weekly", getWeeklySales);
router.get("/monthly", getMonthlySales);
router.get("/by-date", getSalesByDate);
router.get("/search", searchSales);
router.get("/:billNumber", getSaleByBillNumber);

export default router;
