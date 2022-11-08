const express = require('express')
const path = require('path')
const favicon = require('serve-favicon')
const logger = require('morgan')
require('dotenv').config()
require('./config/database')

const app = express()
const PORT = process.env.PORT || 3001



// * Starts Middleware
// ^ Middleware to verify token and assign user object of payload to req.user.
// ^ Be sure to mount before routes
app.use(require('./config/checkToken'))
app.use(logger('dev'))
app.use(express.json())
// ^ Configure both serve-favicon & static middleware
// ^ to serve from the production 'build' folder
app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'build')));


// ^ API Routes - reads top to bottom

app.use('/api/users', require('./routes/api/users'))

// ^ Catch ALL to serve the production app
app.get('/*', (req, res) => {
    res.send(path.join(__dirname, 'build', 'index.html'))
})

// ^ Start Server

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`)
})