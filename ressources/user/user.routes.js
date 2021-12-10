const express = require('express')
const User = require('./user.model')

const router = express.Router()

// create one article
router.post('/', async (req, res, next) => {
	const userDto = req.body // "DTO" means data transfer object
	const user = await User.create(userDto).catch((err) => next(err))
	return res.json(user)
})

// read one article
router.get('/:id', async (req, res, next) => {
	const { id } = req.params
	const user = await User.findById(id).catch((err) => next(err))
	return res.json(user)
})

// read many/all article
router.get('/', async (req, res, next) => {
	const users = await User.find().catch((err) => next(err))
	return res.json(users)
})

// update one article
router.put('/:id', async (req, res, next) => {
	const { id } = req.params
	const userDto = req.body // "DTO" means data transfer object
	const options = { new: true }
	const user = await User.findByIdAndUpdate(id, userDto, options).catch((err) => next(err))
	return res.json(user)
})

// delete one article
router.delete('/:id', async (req, res, next) => {
	const { id } = req.params
	await User.findByIdAndDelete(id).catch((err) => next(err))
	return res.sendStatus(204)
})

module.exports = router
