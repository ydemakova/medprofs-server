const express = require('express')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const configFactory = require('./config')
require('dotenv/config')

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

const store = MongoStore.create({
	mongoUrl:
		process.env.MONGODB_URI ||
		'mongodb+srv://admin-yulia:Test123!@cluster0.4plfa.mongodb.net/medprofs?retryWrites=true&w=majority',
	ttl: 24 * 60 * 60,
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
