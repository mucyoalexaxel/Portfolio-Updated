const express = require('express')
const authRouter = express.Router()
const createError = require('http-errors')
const dbUser = require('../models/dbUsers')
const {authSchema, loginSchema} = require('../helpers/validation_schema')
const {signAccessToken} = require('../helpers/jwt_helper')


// Creating Login Route

authRouter.get('/', (req, res) => {
    res.render('login')
})

// Register Route 
authRouter.post('/register', async (req, res, next) => {
    try {
        const userDetails = await authSchema.validateAsync(req.body)
        const doesExist = await dbUser.findOne({email: userDetails.email})
        if (doesExist) throw createError.Conflict(`${userDetails.email} Email Has Already Been Registered`)

        const newUser = new dbUser(userDetails)
        const savedUser = await newUser.save()
        const accessToken = await signAccessToken(savedUser.id)
        res.status(201).send({accessToken})

    } catch (error) {
        if (error.isJoi === true ) error.status = 422
        next(error)
    }
})


// login Route
authRouter.post('/login', async (req, res, next) => {
    try {
        // Validating the http request
        const result = await loginSchema.validateAsync(req.body)
        const user = await dbUser.findOne({email: result.email})

        if (!user) throw createError.NotFound('User Not Registered')
        const isMatch = await user.isValidPassword(result.password)
        if (!isMatch) throw createError.Unauthorized('Invalid Username Or Password')
        const accessToken = await signAccessToken(user.id)
        res.send({accessToken})
        
    } catch (error) {
        if (error.isJoi === true) return next(createError.BadRequest('Invalid Email Or Password'))
        next(error)
        
    }
})


// Refresh-token
authRouter.post('/refresh-token', async (req, res, next) => {
    res.send('Refresh Token Route')
})


// Logout Route
authRouter.delete('/logout', async (req, res, next) => {
    res.send('Logout Route')
})


// Exporting login.js Route

module.exports = authRouter

