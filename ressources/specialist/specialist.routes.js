const express = require('express')
const Specialist = require('./specialist.model')

const router = express.Router()

// create one specialist
router.post('/', async (req, res, next) => {
	const specialistDto = req.body // "DTO" means data transfer object
	const specialist = await Specialist.create(specialistDto).catch((err) => next(err))
	return res.json(specialist)
})

// read one specialist
router.get('/:id', async (req, res, next) => {
	const { id } = req.params
	const specialist = await Specialist.findById(id).catch((err) => next(err))
	return res.json(specialist)
})

// read many/all specialists
router.get('/', async (req, res, next) => {
	const specialists = await Specialist.find().catch((err) => next(err))
	return res.json(specialists)
})

// update one specialist
router.put('/:id', async (req, res, next) => {
	const { id } = req.params
	const specialistDto = req.body // "DTO" means data transfer object
	const options = { new: true }
	const specialist = await Specialist.findByIdAndUpdate(id, specialistDto, options).catch((err) => next(err))
	return res.json(specialist)
})

// delete one specialist
router.delete('/:id', async (req, res, next) => {
	const { id } = req.params
	await Specialist.findByIdAndDelete(id).catch((err) => next(err))
	return res.sendStatus(204)
})

module.exports = router
