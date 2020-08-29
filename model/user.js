const pool = require('./pool')

class UserAccount {
  constructor(table) {
    this.pool = pool
    this.table = table
    this.pool.on(
      'error',
      (err, client) => `Error, ${err}, on idle client ${client}`
    )
  }
  //GUESS THIS IS THE EQUIVALENT OF PREPARED STATEMENT
  async select(columns, clause) {
    let query = `SELECT ${columns} FROM ${this.table}`
    if (clause) query += clause
    const client = await pool.connect()
    try {
      return await client.query(query)
    } finally {
      client.release()
    }
  }

  async signup(email, username, password) {
    let statement = `INSERT INTO ${this.table} (email, username, password) VALUES ($1, $2, $3) RETURNING user_id` //similar to mongoose
    const client = await pool.connect()
    try {
      return await this.pool.query(statement, [email, username, password])
    } finally {
      client.release()
    }
  }

  async getUser(email, username) {
    let statement, params
    //logs in with username
    if (!email) {
      statement = `SELECT user_id, password FROM ${this.table} WHERE username = $1;`
      params = [username]
    } else {
      statement = `SELECT user_id, password FROM ${this.table} WHERE email = $1;`
      params = [email]
    }
    //execution
    const client = await pool.connect()
    try {
      return await this.pool.query(statement, params)
    } finally {
      client.release()
    }
  }

  async delete(username) {
    let statement = `DELETE FROM ${this.table} WHERE username = $1;`
    const client = await pool.connect()
    try {
      return this.pool.query(statement, [username])
    } finally {
      client.release()
    }
  }

  async truncate() {
    let statement = `TRUNCATE TABLE ${this.table}`
    const client = await pool.connect()
    try {
      return this.pool.query(statement)
    } finally {
      client.release()
    }
  }

  async shutdown() {
    await this.pool.end()
  }
}

module.exports = new UserAccount('user_account')
