import { DataSource } from "typeorm";
import dotenv from "dotenv";
dotenv.config();

export const dataSource = new DataSource({
  type: "postgres" as const,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [__dirname + "/src/entities/**/*.ts"],  // ✅ Ensure the path is correct for entities
  migrations: [__dirname + "/src/migrations/**/*.ts"],  // ✅ Ensure the path is correct for migrations
  ssl: {
    rejectUnauthorized: false,
    ca: process.env.DB_SSL_CERT,
  },
});
