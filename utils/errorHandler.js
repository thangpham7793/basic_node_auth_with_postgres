const errorHandler = (err, req, res, next) => {
  if (err) {
    switch (err.code) {
      case '23502':
        res.status(400).send({
          error: 'All fields must be submitted!',
        })
        break
      case '23505':
        res.status(400).send({
          error: 'Email must be unique!',
        })
      case '23514':
        res.status(400).send({
          error: 'Password must be at least 6 characters!',
        })
      default:
        console.log(`${err.message}`)
        res.status(400).send({ error: err.message })
    }
  }
  next(err)
}

module.exports = errorHandler
