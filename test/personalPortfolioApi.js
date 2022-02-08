const chai = require('chai')
const chaiHttp = require('chai-http')


require('dotenv').config()
const server = require('../server') 
const testDbUser = require('../models/testDbUsers') 

const testUser = { 
    fName: 'Test',
    lName: 'User',
    email: 'testuser@test.com',
    password:'testuser12',
    repeat_password: 'testuser12'
}

// Assertion Style
chai.expect()
chai.should() 
chai.use(chaiHttp) 

describe('Authentication API', () => {
    /**
     * Test To Register User In DataBase
     */
    describe('POST /auth/register', () => {
        it('It Should Register A New User With Valid Credentials', (done) => {
            request(server)
                .post('/auth/register')
                .send('/auth/register')
        })
    })
    
    /**
     * Test To Login User
     */
    
    /**
     * Test To Refresh Access Token
     */
    
    /**
     * Test To Logout
     */
})

