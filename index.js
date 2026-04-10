import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './src/config/db.js';
import authRoutes from './src/routes/authroutes.js';
import productRoutes from './src/routes/productRoutes.js';
import dashboardRoutes from './src/routes/dashboardRoutes.js';
import saleRoutes from './src/routes/saleRoutes.js';
dotenv.config();

// connect database
connectDB();

const app = express();

app.use(  cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('API running...');
});

app.use('/api/auth', authRoutes);
app.use('/api/product', productRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/sale', saleRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
