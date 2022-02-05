const express = require('express')
const router = express.Router()
const messageQuerries = require('../models/messageQueries')

// Creating Routes 

router.get('/', (req, res) => {
    res.render('index')
})


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
 * /messages:
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
router.get('/messages', async (req, res) => {
    try {
      const messages = await messageQuerries.find()
      res.status(200).json(messages)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  })


/**
 * @swagger
 * /{id}:
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
router.get('/:id', getMessage, (req, res) => {
    res.status(200).json(res.message)
    // res.json(res.message.title)
  })

 /**
 * @swagger
 * /messages:
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
router.post('/messages', async (req, res) => {
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
 * /{id}:
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
router.delete('/:id', getMessage, async (req, res) => {
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


// Exporting index.js Route

module.exports = router