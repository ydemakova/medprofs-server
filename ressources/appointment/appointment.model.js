const { Schema, model } = require('mongoose')

const appointmentSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	date: {
		type: Date,
		required: true,
	},
	location: {
		type: [String],
		required: true,
	},
	message: String,
	price: Number,
	status: {
		type: ['requested', 'commited', 'declined'],
		default: 'requested',
	},

	specialist: {
		type: Schema.Types.ObjectId,
		ref: 'User',
	},
})

const Appointment = model('Appointment', appointmentSchema)
module.exports = Appointment
