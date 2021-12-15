const { Schema, model } = require('mongoose')

const articleSchema = new Schema({
	title: {
		type: String,
		required: true,
	},
	text: String,
	sphere: {
		type: String,
		required: true,
	},
	tags: {
		type: [String],
		required: false,
	},
	location: {
		type: String,
		required: true,
	},
	link: String,
	status: {
		type: String,
		enum: ['draft', 'public'],
		default: 'draft',
		required: true,
	},
	author: {
		type: Schema.Types.ObjectId,
		ref: 'User',
	},
})

const Article = model('Article', articleSchema)
module.exports = Article
