import dotenv from "dotenv";
dotenv.config();

const isProd = process.env.NODE_ENV === "production"; // Detect if running in production
console.log(isProd);

export default {
  type: "postgres" as const,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [
    isProd ? "dist/entities/**/*.js" : "src/entities/**/*.ts", // ✅ Correct path for both environments
  ],
  migrations: [
    isProd ? "dist/migrations/**/*.js" : "src/migrations/**/*.ts", // ✅ Correct path for both environments
  ],
  cli: {
    migrationsDir: "src/migrations",
  },
  ssl: {
    rejectUnauthorized: false,
    ca: process.env.DB_SSL_CERT,
  },
};
