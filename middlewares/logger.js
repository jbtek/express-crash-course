//Middleware is function that has req, res, next object and you can change any thing between req and res
//any custom things you can write.

//we want to display log before req and res so we create logger.

const logger = (req, res, next)  => {
	console.log('HELLO Middleware');
	console.log(`Api end point:: ${req.protocol}://${req.get('host')}${req.originalUrl}\n METHOD__ ${req.method}`)
	next()//its callback function in stack that do the next operation and it will end the request and response, or execute the next task in stack
}

module.exports = logger;