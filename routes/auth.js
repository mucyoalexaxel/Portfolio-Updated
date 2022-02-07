const express = require('express')
const authRouter = express.Router()
const authController = require('../Controllers/authController')

// Creating Login Route

authRouter.get('/', (req, res) => {
    res.render('login')
})

/**
 * @swagger
 * components:
 *      securitySchemes:
 *          bearerAuth:
 *              type: http
 *              scheme: bearer
 *              bearerFormat: JWT
 *      schemas:
 *          dbUsers: 
 *              type: object
 *              required: 
 *                  - id
 *                  - fName
 *                  - lName
 *                  - email
 *                  - password                  
 *                  - repeat_password                  
 *              properties: 
 *                  id: 
 *                      type: string
 *                      description: Auto Generated User Id 
 *                  fName: 
 *                      type: string
 *                      description: First Name Of The User
 *                  lName: 
 *                      type: string
 *                      description: Last Name Of The User
 *                  email: 
 *                      type: string
 *                      description: User Email
 *                  password: 
 *                      type: string
 *                      description: User Password
 *                  repeat_password: 
 *                      type: string
 *                      description: User Password Confirmation
 * 
 */

/**
 * @swagger
 * tags: 
 *      name: Authentication & Authorization
 *      description: User Roles, User Authentication & Authorisation  
 */


/**
   * @swagger
   * /auth/register:
   *   post:
   *     summary: New User Registration
   *     tags: [Authentication & Authorization]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/dbUsers'
   *     responses:
   *       201:
   *         description: User Created Successfully 
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/dbUsers'
   *       500:
   *         description: Server Error
   */
// Register Route 
authRouter.post('/register', authController.register)

/**
   * @swagger
   * /auth/login:
   *   post:
   *     summary: User Login
   *     tags: [Authentication & Authorization]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/dbUsers'
   *     responses:
   *       201:
   *         description: User Logged In 
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/dbUsers'
   *       500:
   *         description: Server Error
   */
// login Route
authRouter.post('/login', authController.login)

/**
   * @swagger
   * /auth/refresh_token:
   *   post:
   *     summary: Generates A New Refresh token
   *     tags: [Authentication & Authorization]
   *     security:
   *        - bearerAuth: []
   *     responses:
   *       201:
   *         description: Refresh Token Created Successfully 
   *       400:
   *         description: Refresh Token Expired
   *       500:
   *         description: Server Error
   */
// Refresh-token
authRouter.post('/refresh_token', authController.refreshToken)

/**
   * @swagger
   * /auth/logout:
   *   delete:
   *     summary: Logout
   *     tags: [Authentication & Authorization]
   *     security:
   *        - bearerAuth: []
   *     responses:
   *       201:
   *         description: User Logged Out Successfully
   *       400:
   *         description: Refresh Token Expired
   *       500:
   *         description: Server Error
   */
// Logout Route
authRouter.delete('/logout', authController.logout)


// Exporting login.js Route

module.exports = authRouter

