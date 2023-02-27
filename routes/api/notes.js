
const express = require('express')

const router = express.Router()
const notesCtrl = require('../../controllers/api/notes')
const ensureLoggedIn = require('../../config/ensureLoggedIn')

router.put(`/update/:id`, notesCtrl.editNote)

router.delete('/:id', notesCtrl.deleteNote)

router.get('/:loggedInUser', notesCtrl.getUsersNotes)

router.get('/', notesCtrl.getAllNotes)

router.post('/', notesCtrl.create)


module.exports = router
