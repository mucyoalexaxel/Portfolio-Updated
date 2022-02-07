const mongoose = require('mongoose')

const refreshTokenSchema = new mongoose.Schema({
    refreshToken: {
        type: String,
        required: true,
        unique: true
    }
})

module.exports = mongoose.model('refreshToken', refreshTokenSchema)