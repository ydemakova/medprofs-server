const express = require('express')
const Article = require('./article.model')

const router = express.Router()

// create one article
router.post('/', async (req, res, next) => {
	const user = req.session.loggedInUser
	console.log('user: ', user)
	if (!user) {
		return res.status(401).json({ message: 'User is not signed in!' })
	}

	const articleNew = req.body // "DTO" means data transfer object
	articleNew.author = user._id
	const articleCreated = await Article.create(articleNew).catch((err) => next(err))
	return res.json(articleCreated)
})

// read one article
router.get('/:id', async (req, res, next) => {
	const user = req.session.loggedInUser
	console.log('req.session.loggedInUser: ', req.session.loggedInUser)
	const { id } = req.params
	const article = await Article.findById(id)
		.populate('author')
		.catch((err) => next(err))
	return res.json(article)
})

// read many/all article
router.get('/', async (req, res, next) => {
	const isCurrentUser = req.query.isCurrentUser === 'true'
	const isNewest = req.query.isNewest === 'true'
	const author = req.query.author
	const user = req.session.loggedInUser
	console.log(req.session.loggedInUser)
	let articles

	if (isCurrentUser) {
		if (!user) {
			return res.status(401).json({ message: 'User is not signed in!' })
		}

		articles = await Article.find({ author: user._id })
			.sort({ date: -1 })
			.populate('author')
			.catch((err) => next(err))
		return res.json(articles)
	}

	if (isNewest) {
		articles = await Article.find()
			.sort({ date: -1 })
			.limit(6)
			.populate('author')
			.catch((err) => next(err))
		return res.json(articles)
	}

	if (author) {
		articles = await Article.find({ author })
			.sort({ date: -1 })
			.catch((err) => next(err))
		return res.json(articles)
	}

	articles = await Article.find()
		.populate('author')
		.catch((err) => next(err))
	return res.json(articles)
})

// update one article
router.put('/:id', async (req, res, next) => {
	const user = req.session.loggedInUser
	if (!user) {
		return res.status(401).json({ message: 'User is not signed in!' })
	}

	const { id } = req.params
	const articleNew = req.body
	const set = { $set: { ...articleNew } }
	const options = { new: true }
	await Article.updateOne({ _id: id, author: user._id }, set, options).catch((err) => next(err))
	return res.json(articleNew)
})

// delete one article
router.delete('/:id', async (req, res, next) => {
	const user = req.session.loggedInUser
	if (!user) {
		return res.status(401).json({ message: 'User is not signed in!' })
	}

	const { id } = req.params
	await Article.deleteOne({ _id: id, author: user._id }).catch((err) => next(err))
	return res.sendStatus(204)
})

module.exports = router
