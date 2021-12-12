const { Schema, model } = require('mongoose')

const userSchema = new Schema({
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
	userImage: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	address: {
		city: String,
		country: String,
	},
	education: {
		type: [String],
		required: true,
	},
	specialization: [String],
	degree: [String],
	background: [String],
	type: ['patient', 'professional'],
})

const User = model('User', userSchema)
module.exports = User
