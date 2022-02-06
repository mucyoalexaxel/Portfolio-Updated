const express = require('express')
const adminRoute = express.Router()
const blogArticles = require('../models/blogArticles')
const messageQuerries = require('../models/messageQueries')



// Blog CRUD Operations Route 
/**
 * @swagger
 * components:
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
 */

/**
 * @swagger
 * tags: 
 *      name: Blog Articles API
 *      description: Blog Articles CRUD Operations 
 */

/**
 * @swagger
 * /admin/blog_articles:
 *      get:
 *          tags: [Blog Articles API]
 *          summary: Returns A List Of All Blog Articles
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
adminRoute.get('/blog_articles', async (req, res) => {
    try {
      const articles = await blogArticles.find()
      res.status(200).json(articles)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  })
  
  /**
   * @swagger
   * /admin/blog_articles/{id}:
   *   get:
   *     summary: Get An Article By ID
   *     tags: [Blog Articles API]
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
    adminRoute.get('/blog_articles/:id', getArticle, (req, res) => {
      res.status(200).json(res.article)
      // res.json(res.article.title)
    })
  
    /**
   * @swagger
   * /admin/blog_articles:
   *   post:
   *     summary: Create A New Article
   *     tags: [Blog Articles API]
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
    adminRoute.post('/blog_articles', async (req, res) => {
      const article = new blogArticles({
        title: req.body.title,
        articleContent: req.body.articleContent
      })
      try {
        const newArticle = await article.save()
        res.status(201).json(newArticle)
      } catch (err) {
        res.status(400).json({ message: err.message })
      }
    })
    
    /**
   * @swagger
   * /admin/blog_articles/{id}:
   *  patch:
   *    summary: Update Article By Id
   *    tags: [Blog Articles API]
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
    adminRoute.patch('/blog_articles/:id', getArticle, async (req, res) => {
      if (req.body.title != null) {
        res.article.title = req.body.title
      }
      if (req.body.articleContent != null) {
        res.article.articleContent = req.body.articleContent
      }
      try {
        const updatedArticle = await res.article.save()
        res.status(204).json(updatedArticle)
      } catch (err) {
        res.status(400).json({ message: err.message })
      }
    })
    
  
    /**
   * @swagger
   * /admin/blog_articles/{id}:
   *   delete:
   *     summary: Deleting An Article By Id
   *     tags: [Blog Articles API]
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
    adminRoute.delete('/blog_articles/:id', getArticle, async (req, res) => {
      try {
        await res.article.remove()
        res.status(200).json({ message: 'Article Deleted Successfully' })
      } catch (err) {
        res.status(500).json({ message: err.message })
      }
    })
    
    async function getArticle(req, res, next) {
      let article
      try {
        article = await blogArticles.findById(req.params.id)
        if (article == null) {
          return res.status(404).json({ message: 'Cannot Find Article' })
        }
      } catch (err) {
        return res.status(500).json({ message: err.message })
      }
    
      res.article = article
      next()
    }

    // Message Querries CRUD Operations Route

/**
 * @swagger
 * components:
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
 *      name: Message Querries API
 *      description: CRUD Operations Message Querries
 */

/**
 * @swagger
 * /admin/messages:
 *      get:
 *          tags: [Message Querries API]
 *          summary: Returns A List Of All Message Querries
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
adminRoute.get('/messages', async (req, res) => {
    try {
      const messages = await messageQuerries.find()
      res.status(200).json(messages)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  })


/**
 * @swagger
 * /admin/messages/{id}:
 *   get:
 *     summary: Get A Message Querry By ID
 *     tags: [Message Querries API]
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
adminRoute.get('/messages/:id', getMessage, (req, res) => {
    res.status(200).json(res.message)
    // res.json(res.message.title)
  })

 /**
 * @swagger
 * /admin/messages:
 *   post:
 *     summary: Create A New Message Querry
 *     tags: [Message Querries API]
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
adminRoute.post('/messages', async (req, res) => {
    const message = new messageQuerries({
        fullNames: req.body.fullNames,
        email: req.body.email,
        project: req.body.project,
        message: req.body.message
    })
    try {
      const newMessage = await message.save()
      res.status(201).json(newMessage)
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  })

/**
 * @swagger
 * /admin/messages/{id}:
 *   delete:
 *     summary: Deleting Message Querry By Id
 *     tags: [Message Querries API]
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
adminRoute.delete('/messages/:id', getMessage, async (req, res) => {
    try {
      await res.message.remove()
      res.status(200).json({ message: 'Message Deleted Successfully' })
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  })
  
  async function getMessage(req, res, next) {
    let message
    try {
        message = await messageQuerries.findById(req.params.id)
      if (message == null) {
        return res.status(404).json({ message: 'Cannot Find Message' })
      }
    } catch (err) {
      return res.status(500).json({ message: err.message })
    }
  
    res.message = message
    next()
  }


// Exporting Routes 

module.exports = adminRoute