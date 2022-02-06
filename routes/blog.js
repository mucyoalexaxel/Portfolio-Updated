const express = require('express')
const blogRouter = express.Router()
const blogArticles = require('../models/blogArticles')


// Rendering The Blog Site
blogRouter.get('/', (req, res) => {
    res.render('blog')
})




// Exporting blog.js Route

module.exports = blogRouter