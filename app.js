const express = require('express')
const session = require('express-session')
const MongoDBStore = require('connect-mongo')(session)
const configFactory = require('./config')
require('dotenv/config')
const MONGO_URI = require('./db')

const app = express()
configFactory(app)

const fileUploadRoutes = require('./ressources/file-upload.routes')
const { isLoggedIn } = require('./ressources/auth/auth.middleware')
const authRouter = require('./ressources/auth/auth.routes')
const usersRouter = require('./ressources/user/user.routes')
const articlesRouter = require('./ressources/article/article.routes')
const appointmentsRouter = require('./ressources/appointment/appointment.routes')

// ---------------------------------------------------
//      EXPRESS-SESSION CONFIG
// ---------------------------------------------------

const store = new MongoDBStore({
	url: MONGO_URI,
	secret: process.env.SESSION_SECRET,
	touchAfter: 24 * 60 * 60,
})
store.on('error', (e) => {
	console.log('SESSION STORE ERROR', e)
})

app.use(
	session({
		store,
		resave: true,
		secret: process.env.SESSION_SECRET,
		saveUninitialized: false,
		cookie: {
			maxAge: 1000 * 24 * 60 * 60, // your cookie will be cleared after these seconds
		},
	}),
)

// ---------------------------------------------------
//      ROUTES
// ---------------------------------------------------

app.use('/api/auth', authRouter)
app.use('/api', fileUploadRoutes)
app.use('/api/users', usersRouter)
app.use('/api/articles', articlesRouter)
app.use('/api/appointments', appointmentsRouter)
app.use('*', (_, res) => res.sendFile(__dirname + '/public/index.html'))
require('./error-handling')(app)

module.exports = app
