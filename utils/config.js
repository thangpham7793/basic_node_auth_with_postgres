require("dotenv").config();

const localConfig = {
  host: "0.0.0.0",
  user: "test_user",
  port: 5432,
  database: "node_auth",
  password: "6500826",
};

const herokuConfig = {
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
};

const DB_CONFIG =
  process.env.NODE_ENV === "production" ? herokuConfig : localConfig;

const PORT = process.env.PORT || 3000;

module.exports = appConfig = {
  PORT,
  DB_CONFIG,
};
