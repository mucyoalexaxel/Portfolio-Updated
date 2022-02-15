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




const testUserReg = { 
    fName: 'Test',
    lName: 'User',
    email: 'testuser@test.com',
    password:'testuser12',
    repeat_password: 'testuser12'
}

const invalidTestUserReg = { 
    fName: 'Test',
    lName: 'User',
    email: 'testuser',
    password:'testuser12',
    repeat_password: 'testuser12'
}

const testUserLogin = {
    email: 'testuser@test.com',
    password:'testuser12'
}
const wrongTestUserLogin = {
    email: 'testuser@wrong.com',
    password:'testuser12'
}

const invalidTestUserLogin = {
    email: 'testuser',
    password:'testuser12'
}

const testMessage = { 
    fullNames: 'Test User',
    email: 'usertest@test.com',
    project: 'Test Message Project',
    message:'Test Message'
}

const wrongTestMessage = { 
    fullNames: 'Test User',
    email: 'usertest@test.com',
    project: 'Test Message Project'
}

const testBlog = { 
    title: 'Test User',
    articleContent: 'usertest@test.com'
}

const wrongTestBlog = {
    articleContent: 'usertest@test.com'
}

const testBlogUpdate = { 
    title: 'Test User Updated',
    articleContent: 'usertest@test.com Updated'
}

const wrongTestBlogUpdate = { 
    title: '',
    articleContent: ''
}


let userId
let messageId 
let articleId 



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
                    res.body.should.have.property('newMessage')
                    res.body.should.have.property('savedMessageId')
                    messageId = res.body.savedMessageId
                    console.log(messageId)
                    done()
                })
        })

                
        /**
         * Error Testing: Will Test User Trying To Create A New Message Querry With Incomplete Info 
         */
         it('It Should Generate A 400 Error Code When User Tries To Create A New Message Querry With Incomplete Info ', (done) => {
            chai.request(server)
            .post('/admin/messages')
            .send(wrongTestMessage)
            .end((err, res) => {
                res.should.have.status(400)
                res.body.should.property('message')
                const querryErrMessage = res.body.message
                console.log(querryErrMessage)
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
                    res.body.should.have.property('newUserId')
                    userId = res.body.newUserId
                    console.log(userId)
                    done()
                })
            })

            /**
             * Error Testing: Test To ReJect User Registration If They Use Invalid Credentials
             */
             it('It Should Reject User Registration With Invalid Credentials', (done) => {
                chai.request(server)
                    .post('/auth/register')
                    .send(invalidTestUserReg)
                    .end((err, res) => {
                        res.should.have.status(422)
                        done()
                    })
            })
            /**
             * Error Testing: Test To ReJect User Registration If They Currently Exist In The DataBase
             */
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
                    res.should.have.status(400)
                    res.body.should.be.a('object')
                    res.body.should.have.property('accessToken')
                    res.body.should.have.property('refreshToken')
                })
                done()
            })

        /**
             * Error Testing: Test To ReJect User Login If They Use Invalid Credentials
             */
         it('It Should Reject User login With Invalid Credentials', (done) => {
            chai.request(server)
                .post('/auth/login')
                .send(invalidTestUserLogin)
                .end((err, res) => {
                    res.should.have.status(400)
                    done()
                })
        })
        /**
         * Error Testing: Test To ReJect User Login If They Don't Exist In The DataBase
         */
         it('It Should Reject User Login Without Existing Credentials In Database', (done) => {
            chai.request(server)
                .post('/auth/login')
                .send(wrongTestUserLogin)
                .end((err, res) => {
                    res.should.have.status(404)
                    done()
                })
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
    describe('GET /admin/messages/', () => {
        it('It Should Return A Message Querry By Id', (done) => {
            chai.request(server)
            .get(`/admin/messages/${messageId}`)
            .set({ 'Authorization': `Bearer ${accessToken}` })
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('object')
                res.body.should.have.property('message')
                done()
            })
        })

        /**
         * Error Testing: Will Test User Trying To Get A Message With Wrong Id
         */
         it('It Should Generate A 500 Error Code When User Tries To Get A Message With Wrong Id', (done) => {
            const wrongMessageId = messageId + '51'
           chai.request(server)
           .get(`/admin/messages/${wrongMessageId}`)
           .set({ 'Authorization': `Bearer ${accessToken}` })
           .end((err, res) => {
               res.should.have.status(500)
               res.body.should.property('message')
               const messageErrMessage = res.body.message
               console.log(messageErrMessage)
               done()
           })
       })
    })
    /**
     * Test To Delete Message By Id
     */
    describe('DELETE /admin/messages/id', () => {
        it('It Should Delete A Message Querry By Id', (done) => {
            chai.request(server)
            .delete(`/admin/messages/${messageId}`)
            .set({ 'Authorization': `Bearer ${accessToken}` })
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('object')
                res.body.should.have.property('message')
                let deleteRes = res.body.message
                expect(deleteRes).to.be.eq('Message Deleted Successfully')
                done()
            })
        })

        /**
         * Error Testing: Will Test User Trying To Get A Message With Deleted Id
         */
         it('It Should Generate A 404 Error Code When User Tries To Get A Message With Deleted Id', (done) => {
           chai.request(server)
           .get(`/admin/messages/${messageId}`)
           .set({ 'Authorization': `Bearer ${accessToken}` })
           .end((err, res) => {
               res.should.have.status(404)
               res.body.should.property('message')
               const messageErrMessage = res.body.message
               console.log(messageErrMessage)
               done()
           })
       })

        /**
         * Error Testing: Will Test User Trying to Access Route Without Proper Authorization
         */
         it('It Should Generate A 401 Error Code When User Tries To Delete A Message Without Proper Authorization', (done) => {
            chai.request(server)
            .delete(`/admin/messages/${messageId}`)
            .end((err, res) => {
                res.should.have.status(401)
                done()
            })
        })
        
        /**
         * Error Testing: Will Test User Trying to Delete An Article With Wrong Id
         */
         it('It Should Generate A 500 Error Code When User Tries To Delete A Message With Wrong Id', (done) => {
             const wrongMessageId = messageId + '51'
            chai.request(server)
            .delete(`/admin/messages/${wrongMessageId}`)
            .set({ 'Authorization': `Bearer ${accessToken}` })
            .end((err, res) => {
                res.should.have.status(500)
                res.body.should.property('message')
                const messageErrMessage = res.body.message
                console.log(messageErrMessage)
                done()
            })
        })
    })
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
                    res.body.should.have.property('newArticle')
                    res.body.should.have.property('savedArticleId')
                    articleId = res.body.savedArticleId
                    console.log(articleId)
                    done()
                })
        })

        /**
         * Error Testing: Will Test User Trying To Create A New Article With Incomplete Info 
         */
         it('It Should Generate A 400 Error Code When User Tries To Create A New Article With Incomplete Info ', (done) => {
            chai.request(server)
            .post('/admin/blog_articles')
            .set({ "Authorization": `Bearer ${accessToken}` })
            .send(wrongTestBlog)
            .end((err, res) => {
                res.should.have.status(400)
                res.body.should.property('message')
                const articleErrMessage = res.body.message
                console.log(articleErrMessage)
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
    describe('GET /admin/blog_articles/id', () => {
        it('It Should Return A Blog Article By Id', (done) => {
            chai.request(server)
            .get(`/admin/blog_articles/${articleId}`)
            .set({ 'Authorization': `Bearer ${accessToken}` })
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('object')
                done()
            })
        })
    })
    /**
     * Test To Update An Article By Id
     */
    describe('PATCH /admin/blog_articles/id', () => {
        it('It Should Update A Blog Article By Id', (done) => {
            chai.request(server)
            .patch(`/admin/blog_articles/${articleId}`)
            .set({ 'Authorization': `Bearer ${accessToken}` })
            .send(testBlogUpdate)
            .end((err, res) => {
                res.should.have.status(204)
                res.body.should.be.a('object')
                done()
            })
        })

        /**
         * Error Testing: Will Test User Trying To Update An Article With Incomplete Info 
         */
         it('It Should Generate A 400 Error Code When User Tries To Update An Article With Incomplete Info ', (done) => {
            chai.request(server)
            .patch(`/admin/blog_articles/${articleId}`)
            .set({ "Authorization": `Bearer ${accessToken}` })
            .send(wrongTestBlogUpdate)
            .end((err, res) => {
                res.should.have.status(400)
                res.body.should.property('message')
                const articleErrMessage = res.body.message
                console.log(articleErrMessage)
                done()
            })
        })
    })
    /**
     * Test To Delete An Article By Id
     */
    describe('DELETE /admin/blog_articles/id', () => {
        it('It Should Delete A Blog Article By Id', (done) => {
            chai.request(server)
            .delete(`/admin/blog_articles/${articleId}`)
            .set({ 'Authorization': `Bearer ${accessToken}` })
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('object')
                res.body.should.have.property('message')
                const deletedRes = res.body.message
                expect(deletedRes).to.be.eq('Article Deleted Successfully')
                done()
            })
        })

        /**
         * Error Testing: Will Test User Trying To Get An Article With Deleted Id
         */
         it('It Should Generate A 404 Error Code When User Tries To Get An Article With Deleted Id', (done) => {
            chai.request(server)
            .get(`/admin/blog_articles/${articleId}`)
            .set({ 'Authorization': `Bearer ${accessToken}` })
            .end((err, res) => {
                res.should.have.status(404)
                res.body.should.property('message')
                const articleErrMessage = res.body.message
                console.log(articleErrMessage)
                done()
            })
        })

        /**
         * Error Testing: Will Test User Trying to Access Route Without Proper Authorization
         */
         it('It Should Generate A 401 Error Code When User Tries To Delete An Article Without Proper Authorization', (done) => {
            chai.request(server)
            .delete(`/admin/blog_articles/${articleId}`)
            .end((err, res) => {
                res.should.have.status(401)
                done()
            })
        })
        
        /**
         * Error Testing: Will Test User Trying to Delete An Article With Wrong Id
         */
         it('It Should Generate A 500 Error Code When User Tries To Delete An Article With Wrong Id', (done) => {
             const wrongArticleId = articleId + '51'
            chai.request(server)
            .delete(`/admin/blog_articles/${wrongArticleId}`)
            .set({ 'Authorization': `Bearer ${accessToken}` })
            .end((err, res) => {
                res.should.have.status(500)
                res.body.should.property('message')
                const articleErrMessage = res.body.message
                console.log(articleErrMessage)
                done()
            })
        })
    })
    /**
     * Test To Generate A New Refresh & Access Token
     */
     describe('POST /auth/refresh_token', () => {
        it('It Should Generate A New Refresh & Access Token', (done) => {
            chai.request(server)
            .post('/auth/refresh_token')
            .set({ 'Authorization': `Bearer ${accessToken}` })
            .set('Cookie', `accessToken=${accessToken}`)
            .set('Cookie', `refreshToken=${refreshToken}`)
            .end((err, res) => {
                res.should.have.status(201)
                done()
            })
        })
        /**
         * Error Testing: Will Test User Trying to Access Route Without Proper Authorization
         */
        it('It Should Generate A 401 Error Code When User Tries To Access The Endpoint Without Proper Authorization', (done) => {
            chai.request(server)
            .post('/auth/refresh_token')
            .end((err, res) => {
                res.should.have.status(401)
                done()
            })
        })
    })
    /**
     * Test To Logout And Blacklist Access & Refresh Token
     */
     describe('DELETE /auth/logout', () => {
        it('It Should Logout A User And Blacklist Access & Refresh Token', (done) => {
            chai.request(server)
            .delete('/auth/logout')
            .set({ 'Authorization': `Bearer ${accessToken}` })
            .set('Cookie', `accessToken= '' `)
            .set('Cookie', `refreshToken= '' `)
            .end((err, res) => {
                res.should.have.status(201)
                res.body.should.have.property('message')
                const logoutMessage = res.body.message
                expect(logoutMessage).to.be.eq('Logged Out Successfully')
                done()
            })
        })

        /**
         * Error Testing: Will Test User Trying to Access Route Without Proper Authorization
         */
         it('It Should Generate A 401 Error Code When User Tries To Logout Without Proper Authorization', (done) => {
            chai.request(server)
            .delete('/auth/logout')
            .end((err, res) => {
                res.should.have.status(401)
                done()
            })
        })
    })
})
