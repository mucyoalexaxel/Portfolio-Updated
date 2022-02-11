const request = require('supertest')
const chai = require('chai')
const expect = chai.expect
const should = chai.should()
const chaiHttp = require('chai-http')
const server = require('../server')
chai.use(chaiHttp)
const agent = request.agent(server)

const dbUsers = require('../models/dbUsers')
const blogArticles = require('../models/blogArticles')
const messageQuerries = require('../models/messageQueries')

/**
* Connecting To The Server Before Testing
*/
 before(done => { 
    server.on('appStarted', () => {
        done()
    })
})

let accessToken;
let refreshToken;

const findUserId = async () => {

    // return await dbUsers.findOne({_id})
}
const userId = findUserId()

const messageId = messageQuerries._id
const articleId = blogArticles._id



const testUserReg = { 
    fName: 'Test',
    lName: 'User',
    email: 'testuser@test.com',
    password:'testuser12',
    repeat_password: 'testuser12'
}

const testUserLogin = {
    email: 'testuser@test.com',
    password:'testuser12'
}

const testMessage = { 
    fullNames: 'Test User',
    email: 'usertest@test.com',
    project: 'Test Message Project',
    message:'Test Message'
}

const testBlog = { 
    title: 'Test User',
    articleContent: 'usertest@test.com'
}

const testBlogUpdate = { 
    title: 'Test User Updated',
    articleContent: 'usertest@test.com Updated'
}




describe('Personal Portfolio API Test', () => {        
    /**
     * Test To Create A Message & Save In DataBase
     */
    describe('POST /admin/messages', () => {
        it('It Should Create A New Message Querry', (done) => {
            chai.request(server)
                .post('/admin/messages')
                .send(testMessage)
                .end((err, res) => {
                    res.should.have.status(201)
                    res.body.should.be.a('object')
                    done()
                })
        })
    })
    /**
     * Test To Register A User & Save In The DataBase
     */
     describe('POST /auth/register', () => {
        it('It Should Register A New User In The Database', (done) => {
            chai.request(server)
                .post('/auth/register')
                .send(testUserReg)
                .end((err, res) => {
                    res.should.have.status(201)
                    res.body.should.be.a('object')
                    accessToken = res.body.accessToken
                    refreshToken = res.body.refreshToken
                    res.body.should.have.property('accessToken')
                    res.body.should.have.property('refreshToken')
                    // console.log(userId)
                    done()
                })
        })
    })
    /**
     * Test To ReJect User Registration If They Currently Exist In The DataBase
     */
     describe('POST /auth/register', () => {
        it('It Should Reject User Registration With Existing Credentials In Database', (done) => {
            chai.request(server)
                .post('/auth/register')
                .send(testUserReg)
                .end((err, res) => {
                    res.should.have.status(409)
                    done()
                })
        })
    })
    /**
     * Test To Login An Existing User 
     */
     describe('POST /auth/login', () => {
        it('It Should Login An Existing User', (done) => {
            chai.request(server)
                .post('/auth/login')
                .send(testUserLogin)
                .end(async (err, res) => {
                    res.should.have.status(201)
                    res.body.should.be.a('object')
                    res.body.should.have.property('accessToken')
                    res.body.should.have.property('refreshToken')
                })
                done()
            })
    })
    /**
     * Test To Get All Messages
     */
    describe('GET /admin/messages', () => {
        it('It Should Return An Array Of All Message Querries', (done) => {
            chai.request(server)
            .get('/admin/messages')
            .set({ 'Authorization': `Bearer ${accessToken}` })
            .end((err, res) => {
                res.should.have.status(200)
                done()
            })
        })
    })
    /**
     * Test To Get Message By Id
     */
    //  describe('GET /admin/messages/id', () => {
    //     it('It Should Return A Message Querry By Id', (done) => {
    //         chai.request(server)
    //         .get('/admin/messages/id')
    //         .end((err, res) => {
                
    //             done()
    //         })
    //     })
    // })
    /**
     * Test To Delete Message By Id
     */
    //  describe('DELETE /admin/messages/id', () => {
    //     it('It Should Delete A Message Querry By Id', (done) => {
    //         chai.request(server)
    //         .delete('/admin/messages/id')
    //         .end((err, res) => {
                
    //             done()
    //         })
    //     })
    // })
    /**
     * Test To Create An Article
     */
     describe('POST /admin/blog_articles', () => {
        it('It Should Create A New Blog Article', (done) => {
            chai.request(server)
                .post('/admin/blog_articles')
                .set({ "Authorization": `Bearer ${accessToken}` })
                .send(testBlog)
                .end((err, res) => {
                    res.should.have.status(201)
                    done()
                })
        })
    })
    /**
     * Test To Get All Articles
     */
    describe('GET /admin/blog_articles', () => {
        it('It Should Return An Array Of All Blog Articles', (done) => {
            chai.request(server)
            .get('/admin/blog_articles')
            .set({ 'Authorization': `Bearer ${accessToken}` })
            .end((err, res) => {
                res.should.have.status(200)
                done()
            })
        })
    })
    /**
     * Test To Get An Article By Id
     */
    //  describe('GET /admin/blog_articles/id', () => {
    //     it('It Should Return A Blog Article By Id', (done) => {
    //         chai.request(server)
    //         .get('/admin/blog_articles/id')
    //         .end((err, res) => {
                
    //             done()
    //         })
    //     })
    // })
    /**
     * Test To Update An Article By Id
     */
    //  describe('PATCH /admin/blog_articles/id', () => {
    //     it('It Should Update A Blog Article By Id', (done) => {
    //         chai.request(server)
    //         .patch('/admin/blog_articles/id')
    //         .end((err, res) => {
                
    //             done()
    //         })
    //     })
    // })
    // /**
    //  * Test To Delete An Article By Id
    //  */
    //  describe('Delete /admin/blog_articles/id', () => {
    //     it('It Should Delete A Blog Article By Id', (done) => {
    //         chai.request(server)
    //         .delete('/admin/blog_articles/id')
    //         .end((err, res) => {
                
    //             done()
    //         })
    //     })
    // })
    /**
     * Test To Generate A New Refresh & Access Token
     */

    /**
     * Test To Logout And Blacklist Access & Refresh Token
     */
})
