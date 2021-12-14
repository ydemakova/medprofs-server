const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const User = require('../user/user.model')
const { regexEmail, regexPassword } = require('./auth.values.js')

router.post('/sign-up', async (req, res) => {
	const { username, email, password, firstName, lastName, education } = req.body
	console.log(req.body)

	if (!username || !email || !password || !firstName || !lastName || !education) {
		return res.status(500).json({
			errorMessage:
				'Please enter your personal data: first name, last name, username, email, password and education',
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
	const user = { ...req.body, password: hash }
	const userCreated = await User.create(user).catch((e) => (err = e))

	if (err) {
		if (err.code === 11000) {
			return res.status(409).json({ message: 'username or email entered already exists!' })
		}
		return res.status(500).json({ message: 'Something went wrong! Try again later!' })
	}

	delete userCreated.password // insure password is deleted
	return res.status(200).json(user)
})

//  all POST requests will be handled on http:localhost:5005/api/signin
router.post('/sign-in', async (req, res) => {
	const { email, password } = req.body

	if (!email || !password) {
		return res.status(400).json({ message: 'Please enter email and password' })
	}
	if (!regexEmail.test(email)) {
		return res.status(400).json({ message: 'Email format not correct' })
	}

	let err
	const user = await User.findOne({ email }).catch((e) => (err = e))
	if (err) {
		return res.status(404).json({ message: 'Email does not exist' })
	}

	let doesItMatch = bcrypt.compareSync(password, user.password)
	if (doesItMatch) {
		delete user.password
		req.session.loggedInUser = userData
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
