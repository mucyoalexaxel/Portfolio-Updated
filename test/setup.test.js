process.env.NODE_ENV= 'test'

const dbUser = require('../models/dbUsers')
const blogArticles = require('../models/blogArticles')
const messageQuerries = require('../models/messageQueries')

//Cleaning The Database Before And After Each Test
before((done) => { 
    dbUser.deleteMany({}, function(err) {})
    blogArticles.deleteMany({}, function(err) {})
    messageQuerries.deleteMany({}, function(err) {})
    done()
})

after((done) => {
    dbUser.deleteMany({}, function(err) {})
    blogArticles.deleteMany({}, function(err) {})
    messageQuerries.deleteMany({}, function(err) {})
    done()
})
