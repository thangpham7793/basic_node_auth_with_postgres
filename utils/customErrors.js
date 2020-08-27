//assume the order is email, username, password
const customErrors = (invalidValue, message) => {
  throw new Error(`"${invalidValue}" is invalid: ${message}`)
}

module.exports = customErrors
