const mongoose = require('mongoose')

const dbUsersSchema = new mongoose.Schema({
    fName: {
        type: String,
        required: true 
    },
    lName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true 
    },
    password: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('dbUsers', dbUsersSchema)