
const express = require('express')

const router = express.Router()
const notesCtrl = require('../../controllers/api/notes')
const ensureLoggedIn = require('../../config/ensureLoggedIn')

// ^ // GET /api/users/check-token
// router.get('/check-token', ensureLoggedIn, usersCtrl.checkToken)

router.post('/new-note', notesCtrl.create)


module.exports = router
