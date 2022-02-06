const joi = require('@hapi/joi')


const authSchema = joi.object({
    fName: joi.string().min(3).required(),
    lName: joi.string().min(3).required(),
    email: joi.string().email().lowercase().required(),
    password: joi.string().min(8).max(30).required().label('Password'),
    repeat_password: joi.any().equal(joi.ref('password')).required().label('Confirm password').options({ messages: { 'any.only': '{{#label}} Password does not match'} })
}) 

const loginSchema = joi.object({
    email: joi.string().email().lowercase().required(),
    password: joi.string().min(8).max(30).required()
}) 


module.exports = {authSchema, loginSchema}