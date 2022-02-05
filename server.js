// Loading MongoDb Database In The Server from our .env file
if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}


// require('dotenv').config()
// Importing Libaries 

const mongoose = require('mongoose')
const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const swaggerUI = require('swagger-ui-express')
const swaggerJsDoc = require('swagger-jsdoc')


// Importing Routes In The Server 

const blogRouter = require('./routes/blog') // Login Route
const indexRouter = require('./routes/index') // Index Route 
const loginRouter = require('./routes/login') // Login Route

// API Swager Documentation

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Personal Portfolio API",
            version: "1.0.0",
            description: "This API Will Manage:\n 1. CRUD Operations For The Blog & Message Querries.\n 2. User Roles, User Authentication & Authorisation"
        },
        servers: [
            {
                url:"http://localhost:7000"
            }
        ],
    },
    apis: ['./routes/*.js'],
}

const apiSpecs = swaggerJsDoc(options)

// Setting Up Engines 

const app = express()

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')

// Using Swagger API Documentation
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(apiSpecs))


// Setting Up Layouts

app.set('layout', 'layouts/layout' , 'layouts/login_page_layout', 'layouts/blog_page_layout') 

// Using Layouts
app.use(expressLayouts)
app.use(express.static('public'))

app.use(express.json()) /* You NEED express.json() and express.urlencoded() for POST and PUT requests, because in both these requests you are sending data (in the form of some data object) to the server and you are asking the server to accept or store that data (object), which is enclosed in the body (i.e. req.body) of that (POST or PUT) Request */

// Using Routes

app.use('/', indexRouter) // Index Route
app.use('/blog_page_layout', blogRouter) // Blog Route
app.use('/login_page_layout', loginRouter) // Login Route



// MongoDB Atlas Connection

const URI = process.env.DATABASE_URI;
const URL = process.env.DATABASE_URL;

const connectDB = async () => {
    // try{
    //     await mongoose.connect(URI , { useNewUrlParser: true, useUnifiedTopology: true })
    //     const dbPort = JSON.stringify(app.listen(process.env.PORT))
    //     console.log('App Is Listening On Port: ' + dbPort)
    //     console.log('Connected To MongoDb Atlas')
    // } catch (err){
    //     console.error(err)
    // }

    mongoose.connect(URL,  { useNewUrlParser: true, useUnifiedTopology: true })
    const db = mongoose.connection
    db.on('error', (error) => console.error(error))
    db.once('open', () => console.log('Connected to Local Mongo Database'))
}
connectDB()

// Connecting & Listening to The Database
app.listen(process.env.PORT || 7000)


