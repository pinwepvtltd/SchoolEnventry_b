import Product from "../models/product.js";
import Sale from "../models/sale.js";

export const getDashboardStats = async (req, res) => {
  const products = await Product.find();
  const sales = await Sale.find().sort({ createdAt: -1 });

  const totalItems = products.length;
  const totalCategories = [...new Set(products.map((p) => p.category))].filter(Boolean).length;
  const lowStockItems = products.filter(
    (p) => Number(p.stockQuantity) <= Number(p.lowStockAlert)
  ).length;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const todayRevenue = sales.reduce((sum, sale) => {
    const createdDate = new Date(sale.createdAt);
    createdDate.setHours(0, 0, 0, 0);
    return createdDate.getTime() === today.getTime() ? sum + Number(sale.total) : sum;
  }, 0);

  const totalSales = sales.length;
  const totalRevenue = sales.reduce((sum, sale) => sum + Number(sale.total), 0);

  const recentSales = sales.slice(0, 5).map((sale) => ({
    _id: sale._id,
    billNumber: sale.billNumber,
    total: sale.total,
    createdAt: sale.createdAt,
  }));

  const chartDays = Array.from({ length: 7 }, (_, index) => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() - (6 - index));
    return date;
  });

  const salesChart = chartDays.map((day) => {
    const dayKey = day.toLocaleDateString("en-IN");
    const totalSalesAmount = sales.reduce((sum, sale) => {
      const saleDate = new Date(sale.createdAt).toLocaleDateString("en-IN");
      return saleDate === dayKey ? sum + Number(sale.total) : sum;
    }, 0);
    return {
      _id: day.toISOString(),
      totalSales: totalSalesAmount,
    };
  });

  res.json({
    summary: {
      totalItems,
      totalCategories,
      todayRevenue,
      totalSales,
      totalRevenue,
      lowStockItems,
    },
    recentSales,
    salesChart,
  });
};
