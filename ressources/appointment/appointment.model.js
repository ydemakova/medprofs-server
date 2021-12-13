const { Schema, model } = require('mongoose')

const appointmentSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	message: String,
	price: Number,
	location: {
		type: [String],
		required: true,
	},
	status: {
		type: ['requested', 'commited', 'declined'],
		required: true,
	},
	requester: {
		type: Schema.Types.ObjectId,
		ref: 'User',
	},
})

const Appointment = model('Appointment', appointmentSchema)
module.exports = Appointment
