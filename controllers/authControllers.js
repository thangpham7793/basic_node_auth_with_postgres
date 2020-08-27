const user = require('../model/user')
const { isEmail } = require('validator')
const customErrors = require('../utils/customErrors')
const bcrypt = require('bcrypt')

//this is for the sign-up page (ah so it would increase load time?)
const signupGETHandler = async (req, res) => {
  res.render('signup')
}

const signupPOSTHandler = async (req, res) => {
  const { email, username, password } = req.body

  //simple input validation
  if (!isEmail(email)) {
    customErrors(email, 'Invalid email')
  } else if (password.length < 6) {
    customErrors(password, 'Password must be at least 6-character long!')
  }

  //hasing pw before sending to db
  //use async since bcrypt.hash is CPU intensive and thread-blocking
  const hashedPw = await bcrypt.hash(password, 10)
  const createdUser = await user.signup(email, username, hashedPw)
  res.status(201).send(createdUser.rows[0])
}
const loginGETHandler = (req, res) => {
  res.render('login')
}
const loginPOSTHandler = (req, res) => {
  const { email, username, password } = req.body
  if (isEmail(email)) {
    res.send(`User attempts to sign in with ${JSON.stringify(req.body)}`)
  } else {
    customErrors(email, 'Invalid email')
  }
}

const selectAllHandler = async (req, res) => {
  const result = await user.select('*')
  res.status(200).send(result.rows)
}

module.exports = {
  selectAllHandler,
  signupGETHandler,
  signupPOSTHandler,
  loginGETHandler,
  loginPOSTHandler,
}
