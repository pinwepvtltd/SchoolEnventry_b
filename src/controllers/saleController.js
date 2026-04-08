import Sale from "../models/sale.js";
import Product from "../models/product.js";

// 📥 Create/Save Bill as Sale
export const createSale = async (req, res) => {
  try {
    const { studentName, fatherName, items, subtotal, discount, total, paymentMethod, notes } = req.body;

    // Generate unique bill number
    const billNumber = `BILL-${Date.now()}`;

    const sale = new Sale({
      studentName,
      fatherName,
      items,
      subtotal,
      discount,
      discountAmount: (subtotal * discount) / 100,
      total,
      paymentMethod,
      billNumber,
      notes,
      status: "completed",
    });

    // Update product stock
    for (let item of items) {
      await Product.findByIdAndUpdate(
        item.productId,
        { $inc: { stockQuantity: -item.quantity } }
      );
    }

    await sale.save();
    res.status(201).json({ success: true, sale, billNumber });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// 📊 Get all sales
export const getAllSales = async (req, res) => {
  try {
    const sales = await Sale.find().sort({ createdAt: -1 });
    res.json({ sales });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 📅 Get today's sales
export const getDailySales = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const sales = await Sale.find({
      createdAt: { $gte: today, $lt: tomorrow },
    }).sort({ createdAt: -1 });

    res.json({ sales });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 📊 Get weekly sales
export const getWeeklySales = async (req, res) => {
  try {
    const today = new Date();
    const weekAgo = new Date(today.setDate(today.getDate() - 7));

    const sales = await Sale.find({
      createdAt: { $gte: weekAgo },
    }).sort({ createdAt: -1 });

    res.json({ sales });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 📅 Get monthly sales
export const getMonthlySales = async (req, res) => {
  try {
    const today = new Date();
    const monthAgo = new Date(today.setMonth(today.getMonth() - 1));

    const sales = await Sale.find({
      createdAt: { $gte: monthAgo },
    }).sort({ createdAt: -1 });

    res.json({ sales });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 🔍 Get sales by date
export const getSalesByDate = async (req, res) => {
  try {
    const { date } = req.query;

    if (!date) return res.status(400).json({ error: "Date is required" });

    const searchDate = new Date(date);
    searchDate.setHours(0, 0, 0, 0);

    const nextDate = new Date(searchDate);
    nextDate.setDate(nextDate.getDate() + 1);

    const sales = await Sale.find({
      createdAt: { $gte: searchDate, $lt: nextDate },
    }).sort({ createdAt: -1 });

    res.json({ sales });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 🔍 Search sales by student name or father name
export const searchSales = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ error: "Search query is required" });
    }

    const sales = await Sale.find({
      $or: [
        { studentName: { $regex: query, $options: "i" } },
        { fatherName: { $regex: query, $options: "i" } },
        { billNumber: { $regex: query, $options: "i" } },
      ],
    }).sort({ createdAt: -1 });

    res.json({ sales });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 📄 Get sale by bill number
export const getSaleByBillNumber = async (req, res) => {
  try {
    const { billNumber } = req.params;
    const sale = await Sale.findOne({ billNumber });

    if (!sale) {
      return res.status(404).json({ error: "Sale not found" });
    }

    res.json({ sale });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
