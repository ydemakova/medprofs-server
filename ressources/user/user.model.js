const { Schema, model } = require('mongoose')

const userSchema = new Schema({
	username: {
		type: String,
		required: true,
		unique: true,
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
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	address: {
		city: String,
		country: String,
	},
	education: String,
	specialization: [String],
	degree: [String],
	background: [String],
	type: ['visitor', 'specialist'],
})

const User = model('User', userSchema)
module.exports = User
