import "reflect-metadata";
import express from "express";
import cors from "cors";
import { createConnection } from "typeorm";
import productRoutes from "./src/routes/productRoutes";
import dotenv from "dotenv";
import { Client } from "pg";
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

// Connect to PostgreSQL using TypeORM
createConnection()
  .then(() => {
    console.log("🚀 Connected to PostgreSQL successfully via TypeORM");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch(err => console.error("❌ TypeORM connection error:", err));

// createConnection().then(() => {
//   app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// }).catch(error => console.log(error));
