const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const testDbUsers = new mongoose.Schema({
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
        required: true,
        lowercase: true,
        unique:true
    },
    password: {
        type: String,
        required: true
    },
    repeat_password: {
        type: String,
        required: true
    }
})

testDbUsers.pre('save', async function (next) {
    try {
        const passSalt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(this.password, passSalt)
        this.password = hashedPassword
        this.repeat_password = hashedPassword
        next()
    } catch (err) {
        next(err)
    }
})

testDbUsers.methods.isValidPassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.password)
    } catch (error) {
        throw error
    }
}

module.exports = mongoose.model('testDbUser', testDbUsers)