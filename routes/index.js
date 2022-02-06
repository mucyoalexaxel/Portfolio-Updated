const express = require('express')
const router = express.Router()
const messageQuerries = require('../models/messageQueries')

// Creating Routes 

router.get('/', (req, res) => {
    res.render('index')
})


// Exporting index.js Route

module.exports = router