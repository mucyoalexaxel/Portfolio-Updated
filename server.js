// Loading MongoDb Database In The Server from our .env file
if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

// Importing Libaries 

const mongoose = require('mongoose')
const express = require('express')
const ejs = require('ejs')
const app = express()
const expressLayouts = require('express-ejs-layouts')

// Importing Routes In The Server 

const indexRouter = require('./routes/index') // Index Route 
const loginRouter = require('./routes/login') // Login Route
const blogRouter = require('./routes/blog') // Login Route
// Setting Up Engines 

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')



// Setting Up Layouts

app.set('layout', 'layouts/layout' , 'layouts/login_page_layout', 'layouts/blog_page_layout') 

// Using Layouts
app.use(expressLayouts)
app.use(express.static('public'))


// Using Routes

app.use('/', indexRouter) // Index Route
app.use('/login_page_layout', loginRouter) // Login Route
app.use('/blog_page_layout', blogRouter) // Blog Route

// MongoDB Atlas Connection

const URI = process.env.DATABASE_URL;

const connectDB = async () => {
    await mongoose.connect(URI , { useNewUrlParser: true, useUnifiedTopology: true })
    app.listen(process.env.PORT)
    const dbPort = JSON.stringify(app.listen(process.env.PORT))
    console.log('App Is Listening On Port: ' + dbPort)
    console.log('Connected To MongoDb Atlas')
}
connectDB()

// Connecting & Listening to The Database
app.listen(process.env.PORT || 7000)


