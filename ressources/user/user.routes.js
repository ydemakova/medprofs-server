const express = require('express')
const User = require('./user.model')

const router = express.Router()

// create one user
router.post('/', async (req, res, next) => {
	const userDto = req.body // "DTO" means data transfer object
	const user = await User.create(userDto).catch((err) => next(err))
	return res.status(201).json(user)
})

// read one user
router.get('/:id', async (req, res, next) => {
	const { id } = req.params
	const user = await User.findById(id).catch((err) => next(err))
	return res.json(user)
})

// read many/all users
router.get('/', async (req, res, next) => {
	const users = await User.find().catch((err) => next(err))
	return res.json(users)
})

// update one user
router.put('/:id', async (req, res, next) => {
	const { id } = req.params
	const userDto = req.body // "DTO" means data transfer object
	const options = { new: true }
	const user = await User.findByIdAndUpdate(id, userDto, options).catch((err) => next(err))
	req.session.loggedInUser = { ...req.session.loggedInUser, ...userDto }
	return res.status(200).json(user)
})

// delete one user
router.delete('/:id', async (req, res, next) => {
	const { id } = req.params
	await User.findByIdAndDelete(id).catch((err) => next(err))
	return res.sendStatus(204)
})

module.exports = router
