const { Schema, model } = require('mongoose')

const appointmentSchema = new Schema({
	title: {
		type: String,
		required: true,
	},
	titleImage: String,
	text: String,
	tags: {
		type: [String],
		required: true,
	},
	locations: {
		type: [String],
		required: true,
	},
	links: [String],
	status: {
		type: ['draft', 'public'],
		required: true,
	},
	author: {
		type: Schema.Types.ObjectId,
		ref: 'User',
	},
})

const Appointment = model('Appointment', appointmentSchema)
module.exports = Appointment
