const express = require('express')
const loginRouter = express.Router()
const bcrypt = require('bcrypt')
const dbUsers = require('../models/dbUsers')


// Creating Login Route

loginRouter.get('/login_page', (req, res) => {
    res.render('login')
})



// Exporting login.js Route

module.exports = loginRouter