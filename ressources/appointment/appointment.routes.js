const express = require('express')
const Appointment = require('./appointment.model')

const router = express.Router()

// create new appointment
router.post('/', async (req, res, next) => {
	const appointmentDto = req.body
	const appointment = await Appointment.create(appointmentDto).catch((err) => next(err))
	return res.json(appointment)
})

// read one appointment
router.get(':id', async (req, res, next) => {
	const { id } = req.params
	const appointment = await Appointment.findById(id).catch((err) => next(err))
	return res.json(appointment)
})

// read many/all appointments
router.get('/', async (req, res, next) => {
	const appointments = await Appointment.find().catch((err) => next(err))
	return res.json(appointments)
})

// update one appointment
router.put('/:id', async (req, res, next) => {
	const { id } = req.params
	const appointmentDto = req.body
	const options = { new: true }
	const appointment = await Appointment.findByIdAndUpdate(id, appointmentDto, options).catch((err) => next(err))
	return res.json(appointment)
})

// delete one appointment
router.delete('/:id', async (req, res, next) => {
	const { id } = req.params
	await Appointment.findByIdAndDelete(id).catch((err) => next(err))
	return res.sendStatus(204)
})
module.exports = router
