const express = require('express')
require('dotenv/config')
require('./db')

const app = express()
require('./config')(app)

const usersRouter = require('./ressources/user/user.routes')
const articleRouter = require('./ressources/article/article.routes')
app.use('/api/users', usersRouter)
app.use('/api/articles', articleRouter)
require('./error-handling')(app)

module.exports = app
