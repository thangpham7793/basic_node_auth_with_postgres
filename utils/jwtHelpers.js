const jwt = require('jsonwebtoken')
const fs = require('fs')
const path = require('path')

const createToken = async (data) => {
  const secret = fs.readFileSync(path.join(__dirname, '.secret'))
  try {
    const token = await jwt.sign(data, secret)
    return token
  } catch (err) {
    throw new Error('Error signing token!')
  }
}

module.exports = { createToken }
