import { DataSource } from "typeorm";
import dotenv from "dotenv";
dotenv.config();

const isProd = process.env.NODE_ENV === "production"; // ✅ Check if running in production

export const dataSource = new DataSource({
  type: "postgres" as const,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [
    isProd ? "dist/entities/**/*.js" : "src/entities/**/*.ts", // ✅ Correct path for entities
  ],
  migrations: [
    isProd ? "dist/migrations/**/*.js" : "src/migrations/**/*.ts", // ✅ Correct path for migrations
  ],
  ssl: process.env.DB_SSL_CERT
    ? {
        rejectUnauthorized: false,
        ca: process.env.DB_SSL_CERT,
      }
    : false, // ✅ Ensure SSL works only if DB_SSL_CERT is provided
});
