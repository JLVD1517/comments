const express = require('express')
const router = express.Router()
const comments = require(`../controllers/comments`)

router.post('/create', comments.create)
router.post('/reply', comments.reply)
router.post('/update', comments.update)

module.exports = router
