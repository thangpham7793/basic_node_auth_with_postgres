//assume the order is email, username, password
const customErrors = (invalidValue, message) => {
  if (!invalidValue) {
    throw new Error(`${message}`)
  }
  throw new Error(`"${invalidValue}" is invalid: ${message}`)
}

module.exports = customErrors
