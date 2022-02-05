const mongoose = require('mongoose')

const messageQueriesSchema = new mongoose.Schema({
    fullNames: {
        type: String,
        required: true 
    },
    email: {
        type: String,
        required: true
    },
    project: {
        type: String,
        required: true 
    },
    message: {
        type: String,
        required: true
    },
    dateOfMessage: {
        type: Date,
        required: true,
        default: Date.now
    }
})

module.exports = mongoose.model('messageQuerries', messageQueriesSchema)