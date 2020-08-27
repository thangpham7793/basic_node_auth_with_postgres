const user = require("../model/user");

const signupGETHandler = async (req, res) => {
  res.render("signup");
};
const signupPOSTHandler = async (req, res) => {
  const { email, username, password } = req.body;
  const createdUser = await user.signup(email, username, password);
  res.status(201).send(createdUser.rows[0]);
};
const loginGETHandler = (req, res) => {
  res.render("login");
};
const loginPOSTHandler = (req, res) => {
  const { email, password } = req.body;
  res.send(`User attempts to sign in with ${JSON.stringify(req.body)}`);
};

const selectAllHandler = async (req, res) => {
  const result = await user.select("*");
  res.status(200).send(result.rows);
};

module.exports = {
  selectAllHandler,
  signupGETHandler,
  signupPOSTHandler,
  loginGETHandler,
  loginPOSTHandler,
};
