const { Schema, model } = require('mongoose')

const articleSchema = new Schema({
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

const Article = model('Article', articleSchema)
module.exports = Article
