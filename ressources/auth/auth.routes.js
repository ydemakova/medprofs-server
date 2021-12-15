const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const User = require('../user/user.model')
const { regexEmail, regexPassword } = require('./auth.values.js')
const { isLoggedIn } = require('./auth.middleware')

router.post('/sign-up', async (req, res) => {
	const { username, email, password, firstName, lastName } = req.body
	if (!username || !email || !password || !firstName || !lastName) {
		return res.status(500).json({
			errorMessage: 'Please enter your personal data: first name, last name, username, email and password',
		})
	}
	if (!regexEmail.test(email)) {
		return res.status(500).json({
			errorMessage: 'Email format not correct!',
		})
	}
	// if (!regexPassword.test(password)) {
	// 	return res.status(500).json({
	// 		errorMessage: 'Password needs to have 8 characters, a number and an Uppercase alphabet',
	// 	})
	// }

	let err
	const salt = bcrypt.genSaltSync(10)
	const hash = await bcrypt.hash(password, salt)
	const user = { ...req.body, password: hash }
	const userCreated = await User.create(user).catch((e) => (err = e))

	if (err) {
		if (err.code === 11000) {
			return res.status(409).json({ message: 'username or email entered already exists!' })
		}
		return res.status(500).json({ message: 'Something went wrong! Try again later!' })
	}

	console.log(JSON.stringify(userCreated, null, 2))
	userCreated.password = '***'
	req.session.loggedInUser = userCreated
	return res.status(200).json(userCreated)
})

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
	if (user && bcrypt.compareSync(password, user.password)) {
		user.password = '***'
		req.session.loggedInUser = user
		console.log(JSON.stringify(user, null, 2))
		return res.status(200).json(user)
	}
	return res.status(400).json({ message: "Email and password don't match!" })
})

router.post('/sign-out', (req, res) => {
	req.session.destroy()
	res.status(204).json({})
})

router.get('/current-user', isLoggedIn, (req, res) => {
	res.status(200).json(req.session.loggedInUser)
})

module.exports = router
