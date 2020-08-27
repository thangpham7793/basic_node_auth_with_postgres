const pool = require("./pool");

class UserAccount {
  constructor(table) {
    this.pool = pool;
    this.table = table;
    this.pool.on(
      "error",
      (err, client) => `Error, ${err}, on idle client ${client}`
    );
  }
  //GUESS THIS IS THE EQUIVALENT OF PREPARED STATEMENT
  async select(columns, clause) {
    let query = `SELECT ${columns} FROM ${this.table}`;
    if (clause) query += clause;
    return this.pool.query(query);
  }

  async signup(email, username, password) {
    let statement = `INSERT INTO ${this.table} (email, username, password) VALUES ($1, $2, $3) RETURNING *`;
    return this.pool.query(statement, [email, username, password]);
  }
}

module.exports = new UserAccount("user_account");
