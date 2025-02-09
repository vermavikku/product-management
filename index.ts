import "reflect-metadata";
import express from "express";
import cors from "cors";
import { DataSource } from "typeorm";  // ✅ Use DataSource
import dotenv from "dotenv";
import productRoutes from "./src/routes/productRoutes";
import { dataSource } from "./datasource"; // ✅ Ensure correct import path

dotenv.config();

const app = express();
const corsOptions = {
  origin: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "*",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use("/api/products", productRoutes);

const PORT = process.env.PORT || 5000;

dataSource
  .initialize()  // ✅ Ensure the DataSource is initialized
  .then(() => {
    console.log("🚀 Connected to PostgreSQL successfully via TypeORM");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ TypeORM connection error:", err);
  });

export default app;
