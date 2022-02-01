const express = require('express')
const loginRouter = express.Router()

// Creating Login Route

loginRouter.get('/', (req, res) => {
    res.render('login')
})

// Exporting login.js Route

module.exports = loginRouter