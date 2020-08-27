const express = require('express')
require('express-async-errors')
const app = express()
const authRoutes = require('./routes/authRoutes')
const errorHandler = require('./utils/errorHandler')
// middleware
app.use(express.static('public'))
app.use(express.json())
// view engine
app.set('view engine', 'ejs')

// routes
app.get('/', (req, res) => res.render('home'))
app.get('/smoothies', (req, res) => res.render('smoothies'))
app.use(authRoutes)
app.use(errorHandler)

module.exports = app
