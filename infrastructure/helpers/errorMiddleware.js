const errorMiddleware = (req, res, next) => {
	res.success = (data, message) => res.status(200).json({status: true, data, message})
	res.error = (code, data, message) =>  res.status(code).json({status: false, data, message})
	
	next();
}

module.exports = errorMiddleware;