const express = require('express')
const blogRouter = express.Router()

// Creating Blog Route

blogRouter.get('/', (req, res) => {
    res.render('blog')
})


// Exporting blog.js Route

module.exports = blogRouter