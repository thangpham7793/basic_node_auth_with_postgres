const user = require('../model/user')
const { isEmail } = require('validator')
const customErrors = require('../utils/customErrors')
const bcrypt = require('bcrypt')
const jwtHelpers = require('../utils/jwtHelpers')

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
  const result = await user.signup(email, username, hashedPw)
  //console.log(result.rows[0])
  const { user_id } = result.rows[0]
  const token = await jwtHelpers.createToken({ user_id })

  res.cookie('jwt', token, { httpOnly: true })
  res.status(200).send({ user_id })
}

const loginGETHandler = (req, res) => {
  res.render('login')
}

const loginPOSTHandler = async (req, res) => {
  const { email, username, password } = req.body
  //missing params should be handled by the client side though
  if (!email && !username) {
    customErrors(email, 'Missing Email or Username')
    //if there's email
  } else if (!username) {
    if (!isEmail(email)) {
      customErrors(email, 'Invalid email')
    }
  }
  //get credentials from db
  const result = await user.getUser(email, username)

  //NOTE: the result object is still returned even if no rows are found
  if (!result.rows[0]) {
    console.log('No result found!')
    if (username) {
      customErrors(username, 'Unknown username!')
    }
    customErrors(email, 'Unknown email!')
    return
  }

  //compare hashedPw with received pw
  const matchedUser = result.rows[0]
  const hashedPw = matchedUser.password
  const user_id = matchedUser.user_id
  const matched = await bcrypt.compare(password, hashedPw)

  //send JWT to user here
  if (matched) {
    const token = await jwtHelpers.createToken({
      user_id,
    })
    //javascript can't access this from the client side and
    //all subsequent requests will send the jwt token in the form of cookie
    //along with it
    res.cookie('jwt', token, { httpOnly: true })
    res.status(200).send({ user_id })
    //wrong password
  } else {
    res.status(401).send({ message: 'Invalid Password!' })
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
