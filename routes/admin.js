const express = require('express')
const adminRoute = express.Router()
const {verifyAccessToken} = require('../helpers/jwt_helper')
const adminController = require('../Controllers/adminController')


// Blog CRUD Operations Route 
/**
 * @swagger
 * components:
 *      securitySchemes:
 *          bearerAuth:
 *              type: http
 *              scheme: bearer
 *              bearerFormat: JWT
 *      responses: 
 *          UnauthorizedError:
 *              description: User does not have access to perform the action
 *              content: 
 *                  application/json:
 *                      schema:
 *                         type: object
 *                         properties:
 *                              message:
 *                                  type: string
 *                                  example: 'Unauthorized'
 *          NotFoundError:
 *              description: Not Found
 *              content: 
 *                  application/json: 
 *                      schema: 
 *                          type: object
 *                          properties: 
 *                              message: 
 *                                  type: string 
 *                                  example: 'Not Found'
 *      schemas:
 *          blogArticles: 
 *              type: object
 *              required: 
 *                  - id
 *                  - title
 *                  - articleContent
 *                  - dateOfArticle                  
 *              properties: 
 *                  id: 
 *                      type: string
 *                      description: Auto Generated Id Of The Blog Article
 *                  title: 
 *                      type: string
 *                      description: Title Of The Blog Article
 *                  articleContent: 
 *                      type: string
 *                      description: Article Content
 *                  dateOfArticle: 
 *                      type: number
 *                      description: Date Article Was Created
 * 
 */

/**
 * @swagger
 * tags: 
 *      name: Blog CRUD Operation
 *      description: Blog Articles CRUD Operations 
 */

/**
 * @swagger
 * /admin/blog_articles:
 *      get:
 *          tags: [Blog CRUD Operation]
 *          summary: Returns A List Of All Blog Articles
 *          security:
 *              - bearerAuth: []  
 *          responses: 
 *              200:
 *                  description: List of All Blog Articles
 *                  content: 
 *                      application/json: 
 *                          schema: 
 *                              type: array
 *                              items: 
 *                                  $ref: '#/components/schemas/blogArticles'
 */
// Getting all Article
adminRoute.get('/blog_articles', verifyAccessToken, adminController.allArticles)
  
  /**
   * @swagger
   * /admin/blog_articles/{id}:
   *   get:
   *     summary: Get An Article By ID
   *     tags: [Blog CRUD Operation]
   *     security:
   *        - bearerAuth: [] 
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: Message Id
   *     responses:
   *       200:
   *         description: Article
   *         contens:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/blogArticles'
   *       404:
   *         description: Message not found
   */
    
    // Getting One Article
    adminRoute.get('/blog_articles/:id', verifyAccessToken, adminController.getArticle, adminController.articleById)
  
    /**
   * @swagger
   * /admin/blog_articles:
   *   post:
   *     summary: Create A New Article
   *     tags: [Blog CRUD Operation]
   *     security:
   *        - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/blogArticles'
   *     responses:
   *       201:
   *         description: New Article Created Successfully 
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/blogArticles'
   *       500:
   *         description: Server Error
   */
    
    // Creating one Article
    adminRoute.post('/blog_articles', verifyAccessToken, adminController.createArticle)
    
    /**
   * @swagger
   * /admin/blog_articles/{id}:
   *  patch:
   *    summary: Update Article By Id
   *    tags: [Blog CRUD Operation]
   *    security:
   *        - bearerAuth: []
   *    parameters:
   *      - in: path
   *        name: id
   *        schema:
   *          type: string
   *        required: true
   *        description: Article Id
   *    requestBody:
   *      required: true
   *      content:
   *        application/json:
   *          schema:
   *            $ref: '#/components/schemas/blogArticles'
   *    responses:
   *      204:
   *        description: Article Updated
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/blogArticles'
   *      404:
   *        description: Article Not Found
   *      500:
   *        description: Internal Server Error
   */
    // Updating One Article
    adminRoute.patch('/blog_articles/:id', verifyAccessToken, adminController.getArticle, adminController.updateArticle)
    
  
    /**
   * @swagger
   * /admin/blog_articles/{id}:
   *   delete:
   *     summary: Deleting An Article By Id
   *     tags: [Blog CRUD Operation]
   *     security:
   *        - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: Message Id
   * 
   *     responses:
   *       200:
   *         description: Article Deleted
   *       404:
   *         description: Article Not Found
   */
    // Deleting One Article
    adminRoute.delete('/blog_articles/:id', verifyAccessToken, adminController.getArticle, adminController.deleteArticle)
    

    // Message Querries CRUD Operations Route

/**
 * @swagger
 * components:
 *      securitySchemes:
 *          bearerAuth:
 *              type: http
 *              scheme: bearer
 *              bearerFormat: JWT
 *      responses: 
 *          UnauthorizedError:
 *              description: User does not have access to perform the action
 *              content: 
 *                  application/json:
 *                      schema:
 *                         type: object
 *                         properties:
 *                              message:
 *                                  type: string
 *                                  example: 'Unauthorized'
 *          NotFoundError:
 *              description: Not Found
 *              content: 
 *                  application/json: 
 *                      schema: 
 *                          type: object
 *                          properties: 
 *                              message: 
 *                                  type: string 
 *                                  example: 'Not Found'
 *      schemas:
 *          messageQuerries: 
 *              type: object
 *              required: 
 *                  - id
 *                  - fullNames
 *                  - email
 *                  - project
 *                  - message
 *                  - dateOfMessage
 *              properties: 
 *                  id: 
 *                      type: string
 *                      description: Auto Generated Id Of The Message Querry
 *                  fullNames: 
 *                      type: string
 *                      description: Message Sender's Name
 *                  email: 
 *                      type: string
 *                      description: Message Sender's Email Address
 *                  project: 
 *                      type: string
 *                      description: Message Sender's Proposed Project
 *                  message: 
 *                      type: string
 *                      description: Message Sender's Querry
 *                  dateOfMessage: 
 *                      type: number
 *                      description: Date of when Message Was Sent
 */

/**
 * @swagger
 * tags: 
 *      name: Message Querries CRUD Operation
 *      description: CRUD Operations Message Querries
 */

/**
 * @swagger
 * /admin/messages:
 *      get:
 *          tags: [Message Querries CRUD Operation]
 *          summary: Returns A List Of All Message Querries
 *          security:
 *              - bearerAuth: []
 *          responses: 
 *              200:
 *                  description: List of All Message Querries
 *                  content: 
 *                      application/json: 
 *                          schema: 
 *                              type: array
 *                              items: 
 *                                  $ref: '#/components/schemas/messageQuerries'
 */

// Getting all Message
adminRoute.get('/messages', verifyAccessToken, adminController.allMessages)


/**
 * @swagger
 * /admin/messages/{id}:
 *   get:
 *     summary: Get A Message Querry By ID
 *     tags: [Message Querries CRUD Operation]
 *     security:
 *          - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Message Id
 *     responses:
 *       200:
 *         description: Message Querry
 *         contents:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/messageQuerries'
 *       404:
 *         description: Message not found
 */


// Getting One Message
adminRoute.get('/messages/:id', verifyAccessToken, adminController.getMessage, adminController.messageById)

 /**
 * @swagger
 * /admin/messages:
 *   post:
 *     summary: Create A New Message Querry
 *     tags: [Message Querries CRUD Operation]
 *     security:
 *          - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/messageQuerries'
 *     responses:
 *       201:
 *         description: Message Querry Successfully Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/messageQuerries'
 *       500:
 *         description: Server Error
 */

  // Creating one Message
adminRoute.post('/messages', verifyAccessToken, adminController.createMessage)

/**
 * @swagger
 * /admin/messages/{id}:
 *   delete:
 *     summary: Deleting Message Querry By Id
 *     tags: [Message Querries CRUD Operation]
 *     security:
 *          - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Message Id
 * 
 *     responses:
 *       200:
 *         description: Message Deleted
 *       404:
 *         description: Message Not Found
 *       500:
 *          description: Internal Server Error
 */

  // Deleting One Message
adminRoute.delete('/messages/:id', verifyAccessToken, adminController.getMessage, adminController.deleteMessage)
  


// Exporting Routes 

module.exports = adminRoute