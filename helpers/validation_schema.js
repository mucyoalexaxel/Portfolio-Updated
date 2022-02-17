const joi = require('@hapi/joi')


const authSchema = joi.object({
    fName: joi.string().min(3).required(),
    lName: joi.string().min(3).required(),
    email: joi.string().email().lowercase().required(),
    password: joi.string().min(8).max(30).required().label('Password')
}) 

const loginSchema = joi.object({
    email: joi.string().email().lowercase().required(),
    password: joi.string().min(8).max(30).required()
}) 


module.exports = {authSchema, loginSchema}