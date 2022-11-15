
const express = require('express')

const router = express.Router()
const notesCtrl = require('../../controllers/api/notes')
const ensureLoggedIn = require('../../config/ensureLoggedIn')


router.get('/', notesCtrl.getAllNotes)

router.post('/', notesCtrl.create)

module.exports = router
