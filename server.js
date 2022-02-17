// Loading MongoDb Database In The Server from our .env file
require('dotenv-flow').config();


// Importing Libaries 

const mongoose = require('mongoose')
const express = require('express')
const morgan = require('morgan')
const createError = require('http-errors')
const expressLayouts = require('express-ejs-layouts')
const swaggerUI = require('swagger-ui-express')
const swaggerJsDoc = require('swagger-jsdoc')
const cookieParser = require('cookie-parser')
const cors = require('cors')


// Importing Routes In The Server 

const blogRouter = require('./routes/blog') // Login Route
const indexRouter = require('./routes/index') // Index Route 
const authRouter = require('./routes/auth') // Login Route
const adminRoute = require('./routes/admin') // Messages & Blog Admin Route

// API Swager Documentation

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Personal Portfolio API",
            version: "1.0.0",
            description: "This API Will Manage:\n 1. CRUD Operations For The Blog & Message Querries.\n 2. User Roles, User Authentication & Authorisation"
        },
        servers:[{url: 'http://localhost:8000'},{url: 'https://alexaxel-resume.herokuapp.com'}]
    },
    apis: ['./routes/*.js'],
}

const apiSpecs = swaggerJsDoc(options)



const app = express()
app.use(cors({
    origin: 'null',
    methods: '*'
}))
app.use(morgan('dev'))
app.use(express.json()) /* You NEED express.json() and express.urlencoded() for POST and PUT requests, because in both these requests you are sending data (in the form of some data object) to the server and you are asking the server to accept or store that data (object), which is enclosed in the body (i.e. req.body) of that (POST or PUT) Request */
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

// MongoDB Atlas Connection

const connectDB = async () => {
    // API Mongo Atlas DB
    try{
        await mongoose.connect(process.env.DATABASE_URI , { useNewUrlParser: true, useUnifiedTopology: true })

        // Connecting & Listening to The Database

        app.listen(process.env.PORT || 8000, () => {
            console.log('Personal Portfolio App Has Started')
            app.emit('appStarted')
        })
        console.log('MongoDb Atlas Connected')
        console.log('Listening On Port: ' + process.env.PORT)
    } catch (err){
        console.error(err)
    }

}
connectDB()




// Setting Up View Engines 

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')

// Using Swagger API Documentation
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(apiSpecs))


// Setting Up Layouts

app.set('layout', 'layouts/layout' , 'layouts/login', 'layouts/blog', 'layouts/adminDashboard') 

// Using Layouts
app.use(expressLayouts)
app.use(express.static('public'))



// // Not Found Default Route
// app.use(async (req, res, next) => {
//     next(createError.NotFound())
// })

// // Error Handler 
// app.use((err, res, req, next) => {
//     res.status(err.status || 500)
//     res.send({
//         error: {
//             status: err.status || 500, 
//             message: err.message,
//         },
//     })
// })


// Using Routes

app.use('/', indexRouter) // Index Route
app.use('/blog', blogRouter) // Blog Route
app.use('/auth', authRouter) // Login Route
app.use('/admin', adminRoute) // Blog & Messages Admin Route

module.exports = app



