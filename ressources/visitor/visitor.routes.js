const express = require('express')
const Visitor = require('./visitor.model')

const router = express.Router()

// create one visitor
router.post('/', async (req, res, next) => {
	const visitortDto = req.body // "DTO" means data transfer object
	const visitor = await Visitor.create(visitortDto).catch((err) => next(err))
	return res.json(visitor)
})

// read one visitor
router.get('/:id', async (req, res, next) => {
	const { id } = req.params
	const visitor = await Visitor.findById(id).catch((err) => next(err))
	return res.json(visitor)
})

// read many/all visitors
router.get('/', async (req, res, next) => {
	const visitors = await Visitor.find().catch((err) => next(err))
	return res.json(visitors)
})

// update one visitor
router.put('/:id', async (req, res, next) => {
	const { id } = req.params
	const visitorDto = req.body // "DTO" means data transfer object
	const options = { new: true }
	const visitor = await Visitor.findByIdAndUpdate(id, visitorDto, options).catch((err) => next(err))
	return res.json(visitor)
})

// delete one visitor
router.delete('/:id', async (req, res, next) => {
	const { id } = req.params
	await Visitor.findByIdAndDelete(id).catch((err) => next(err))
	return res.sendStatus(204)
})

module.exports = router
