const express = require('express');
const path = require('path');
const logger = require('./middlewares/logger');
const router = require('./routes/apis/members.router');

const app = express();

const PORT = process.env.PORT || 5000;


//init middleware
app.use(logger);
//use express json middlewares for body parser and form parse
//Note: Always keep these parser above router
app.use(express.json())// this is for sending the json data 
app.use(express.urlencoded({extended:false}));// this is for sending form data

//init router: pass the routes here and in router file we need to put short route like / or /:id etc..
app.use('/api/members',router);

//Set the static folder
//we use express.use method for middlewares.
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
	console.log('Server is running on PORT:', PORT);
})
