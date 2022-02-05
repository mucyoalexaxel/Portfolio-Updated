const express = require('express')
const blogRouter = express.Router()
const blogArticles = require('../models/blogArticles')


// Creating Blog Route

// Rendering The Blog Site
blogRouter.get('/blog_page', (req, res) => {
    res.render('blog')
})

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
 * /blog_page_layout/blog_articles:
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
blogRouter.get('/blog_articles', async (req, res) => {
  try {
    const articles = await blogArticles.find()
    res.status(200).json(articles)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

/**
 * @swagger
 * /blog_page_layout/blog_articles/{id}:
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
  blogRouter.get('/blog_articles/:id', getArticle, (req, res) => {
    res.status(200).json(res.article)
    // res.json(res.article.title)
  })

  /**
 * @swagger
 * /blog_page_layout/blog_articles:
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
  blogRouter.post('/blog_articles', async (req, res) => {
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
 * /blog_page_layout/blog_articles/{id}:
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
  blogRouter.patch('/blog_articles/:id', getArticle, async (req, res) => {
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
 * /blog_page_layout/blog_articles/{id}:
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
  blogRouter.delete('/blog_articles/:id', getArticle, async (req, res) => {
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


// Exporting blog.js Route

module.exports = blogRouter