const { Schema, model } = require('mongoose')

const visitorSchema = new Schema({
	username: {
		type: String,
		required: true,
	},
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	type: ['visitor', 'specialist'],
})

const Visitor = model('Visitor', visitorSchema)
module.exports = Visitor
