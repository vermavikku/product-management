import dotenv from "dotenv";
dotenv.config();

export default {
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: ["src/entities/**/*.ts"],
  migrations: ["src/migrations/**/*.ts"],
  cli: {
    migrationsDir: "src/migrations",
  },
  ssl: {
    rejectUnauthorized: true ,
    ca:process.env.DB_SSL_CERT // ✅ Fix self-signed certificate issue
  },
};
