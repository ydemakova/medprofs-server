const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const Visitor = require('../visitor/visitor.model')
const { regexEmail, regexPassword } = require('./auth.values.js')

router.post('/sign-up', async (req, res) => {
	const { username, email, password, firstName, lastName } = req.body
	console.log(req.body)

	if (!username || !email || !password || !firstName || !lastName || !education || !specialization || !background) {
		return res.status(500).json({
			errorMessage:
				'Please enter your personal data: first name, last name, username, email, password, education, specialization and background',
		})
	}
	if (!regexEmail.test(email)) {
		return res.status(500).json({
			errorMessage: 'Email format not correct!',
		})
	}
	if (!regexPassword.test(password)) {
		return res.status(500).json({
			errorMessage: 'Password needs to have 8 characters, a number and an Uppercase alphabet',
		})
	}

	let err
	const salt = bcrypt.genSaltSync(10)
	const hash = bcrypt.hashSync(password, salt)
	const specialist = { ...req.body, password: hash }
	const specialistCreated = await Specialist.create(specialist).catch((e) => (err = e))

	if (err) {
		if (err.code === 11000) {
			return res.status(409).json({ message: 'username or email entered already exists!' })
		}
		return res.status(500).json({ message: 'Something went wrong! Try again later!' })
	}

	delete specialistCreated.password // insure password is deleted
	return res.status(200).json(specialist)
})

//  all POST requests will be handled on http:localhost:5005/api/signin
router.post('/sign-in', async (req, res) => {
	const { username, password } = req.body

	if (!email || !password) {
		return res.status(400).json({ message: 'Please enter email and password' })
	}
	if (!regexEmail.test(email)) {
		return res.status(400).json({ message: 'Email format not correct' })
	}

	let err
	const specialist = await Specialist.findOne({ email }).catch((e) => (err = e))
	if (err) {
		return res.status(404).json({ message: 'Email does not exist' })
	}

	let doesItMatch = bcrypt.compareSync(password, specialist.password)
	if (doesItMatch) {
		delete specialist.password
		req.session.loggedInSpecialist = userData
		return res.status(200).json(userData)
	}
	return res.status(400).json({ message: "Passwords don't match" })
})

router.post('/sign-out', (req, res) => {
	req.session.destroy()
	res.sendStatus(204)
})

// THIS IS A PROTECTED ROUTE
// will handle all get requests to http:localhost:5005/api/user
// router.get('/user', isLoggedIn, (req, res, next) => {
// 	res.status(200).json(req.session.loggedInUser)
// })

module.exports = router
