
const express = require('express')

const router = express.Router()
const usersCtrl = require('../../controllers/api/users')
const ensureLoggedIn = require('../../config/ensureLoggedIn')

// ^ // GET /api/users/check-token
router.get('/check-token', ensureLoggedIn, usersCtrl.checkToken)

router.post('/login', usersCtrl.login)

router.post('/', usersCtrl.create)


module.exports = router
