const express = require('express')
const Article = require('./article.model')

const router = express.Router()

// create one article
router.post('/', async (req, res, next) => {
	const articleDto = req.body // "DTO" means data transfer object
	const article = await Article.create(articleDto).catch((err) => next(err))
	return res.json(article)
})

// read one article
router.get('/:id', async (req, res, next) => {
	const { id } = req.params
	const article = await Article.findById(id).catch((err) => next(err))
	return res.json(article)
})

// read many/all article
router.get('/', async (req, res, next) => {
	const articles = await Article.find().catch((err) => next(err))
	return res.json(articles)
})

// update one article
router.put('/:id', async (req, res, next) => {
	const { id } = req.params
	const articleDto = req.body // "DTO" means data transfer object
	const options = { new: true }
	const article = await Article.findByIdAndUpdate(id, articleDto, options).catch((err) => next(err))
	return res.json(article)
})

// delete one article
router.delete('/:id', async (req, res, next) => {
	const { id } = req.params
	await Article.findByIdAndDelete(id).catch((err) => next(err))
	return res.sendStatus(204)
})

module.exports = router
