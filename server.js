// Loading myResume Database In The Server

// if (process.env.NODE_ENV !== 'production'){
//     require('dotenv').config()
// }


// Importing Libaries 

const mongoose = require('mongoose')
const express = require('express')
const ejs = require('ejs')
const app = express()
const expressLayouts = require('express-ejs-layouts')

// importing Routes In The Server 

const indexRouter = require('./routes/index') // Index Route 

// Setting Up Engines 

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')


// Setting Up Layouts

app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public')) // Why Does The JS Not Work?


// Using Routes

app.use('/', indexRouter)


// Mongoose DataBase Connection
// mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
// const db = mongoose.connection
// db.on('error', error => console.error(error))
// db.once('open', () => console.log("Connected To Moongose Database Successfully"))

// MongoDB Atlas Connection

const URI = 'mongodb+srv://Admin:mucad2101@resume1.vdlq5.mongodb.net/resume1?retryWrites=true&w=majority';

const connectDB = async () => {
    await mongoose.connect(URI , { useNewUrlParser: true, useUnifiedTopology: true })
    console.log('Connected To MongoDb Atlas')
}
connectDB()

// Connecting & Listening to The Database

app.listen(process.env.PORT || 7000)


