const express = require('express')
require('dotenv/config')
require('./db')

const app = express()
require('./config')(app)

const { isLoggedIn } = require('./ressources/auth/auth.middleware')
const authRouter = require('./ressources/auth/auth.routes')
const usersRouter = require('./ressources/user/user.routes')
const articleRouter = require('./ressources/article/article.routes')

app.use('/api/auth', authRouter)
app.use('/api/users', isLoggedIn, usersRouter)
app.use('/api/articles', isLoggedIn, articleRouter)
require('./error-handling')(app)

// ---------------------------------------------------
//      EXPRESS-SESSION CONFIG
// ---------------------------------------------------

const session = require('express-session')
const MongoStore = require('connect-mongo')

app.use(
	session({
		secret: process.env.SESSION_SECRET, //DON'T FORGET TO ADD THIS IN YOUR .'.env' File
		resave: false,
		saveUninitialized: false,
		cookie: {
			maxAge: 1000 * 24 * 60 * 60, // your cookie will be cleared after these seconds
		},
		store: MongoStore.create({
			mongoUrl: process.env.MONGODB_URI || 'mongodb://localhost/medprofs',
			// Time to Live for sessions in DB. After that time it will delete it!
			ttl: 24 * 60 * 60, // your session will be cleared after these seconds
		}),
	}),
)

module.exports = app
