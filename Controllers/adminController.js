const blogArticles = require('../models/blogArticles')
const messageQuerries = require('../models/messageQueries')

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

module.exports = {
    allArticles: async (req, res) => {
        try {
          const articles = await blogArticles.find()
          res.status(200).json(articles)
        } catch (err) {
          res.status(500).json({ message: err.message })
        }
      },
    articleById: (req, res) => {
        res.status(200).json(res.article)
        // res.json(res.article.title)
      },
    createArticle: async (req, res) => {
        const article = new blogArticles({
          title: req.body.title,
          articleContent: req.body.articleContent
        })
        try {
          const newArticle = await article.save()
          const savedArticleId = newArticle.id
          res.status(201).json({newArticle, savedArticleId})
        } catch (err) {
          res.status(400).json({ message: err.message })
        }
      },
    updateArticle: async (req, res) => {
        if (req.body.title != null) {
          res.article.title = req.body.title
        }
        if (req.body.articleContent != null) {
          res.article.articleContent = req.body.articleContent
        }
        try {
          const updatedArticle = await res.article.save()
          res.status(204).json({updatedArticle})
        } catch (err) {
          res.status(400).json({ message: err.message })
        }
      }, 
    deleteArticle: async (req, res) => {
      try {
        await res.article.remove()
        res.status(200).json({ message: 'Article Deleted Successfully' })
      } catch (err) {
        res.status(500).json({ message: err.message })
      }
    },
    getArticle: getArticle,
    allMessages: async (req, res) => {
        try {
          const messages = await messageQuerries.find()
          res.status(200).json(messages)
        } catch (err) {
          res.status(500).json({ message: err.message })
        }
      },
    messageById: (req, res) => {
        res.status(200).json(res.message)
        // res.json(res.message.title)
      },
    createMessage: async (req, res) => {
        const message = new messageQuerries({
            fullNames: req.body.fullNames,
            email: req.body.email,
            project: req.body.project,
            message: req.body.message
        })
        try {
          const newMessage = await message.save()
          const savedMessageId = newMessage.id
          res.status(201).json({newMessage, savedMessageId})
        } catch (err) {
          res.status(400).json({ message: err.message })
        }
      }, 
    deleteMessage: async (req, res) => {
        try {
          await res.message.remove()
          res.status(200).json({ message: 'Message Deleted Successfully' })
        } catch (err) {
          res.status(500).json({ message: err.message })
        }
      },
    getMessage: getMessage
}