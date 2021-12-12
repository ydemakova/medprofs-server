const isLoggedIn = (req, res, next) => {
	if (req.session.loggedInUser) {
		return next()
	}

	return res.status(401).json({ message: 'Unauthorized user' })
}

module.exports = {
	isLoggedIn,
}
