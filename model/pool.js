const { Pool } = require("pg");
const config = require("../utils/config");
const pool = new Pool(config.DB_CONFIG);

module.exports = pool;
