const mongoose = require('mongoose')


// Blog Articles Schema

const blogArticlesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    articleContent: {
        type: String,
        required: true
    }, 
    dateOfArticle: {
        type: Date,
        required: true,
        default: Date.now
    }
})

module.exports = mongoose.model('blogArticles', blogArticlesSchema)