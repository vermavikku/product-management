import dotenv from "dotenv";
dotenv.config();

export default {
  type: "postgres" as const,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),  // Ensure port is a number
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  // Correct path resolution using __dirname
  entities: [__dirname + "/src/entities/**/*.ts"],  // ✅ Ensure the path is correct for entities
  migrations: [__dirname + "/src/migrations/**/*.ts"],  // ✅ Ensure the path is correct for migrations
  cli: {
    migrationsDir: "src/migrations",
  },
  ssl: {
    rejectUnauthorized: false,
    ca: process.env.DB_SSL_CERT,
  },
};
