const express = require('express');
const uuid = require('uuid');
const router = express.Router();
let members = [
	{
		id:1,
		name:'jay',
		address:'Delhi',
		email:'jay@gmail.com'
	},
	{
		id:2,
		name:'jay2',
		address:'Delhi2',
		email:'jay@gmail.com2'
	}
]
//send the json to the response
router.get('/', (req, res) => {
	//with json method we no need to stringify but if we use send method we need to stringify.
	res.json(members);
})

router.get('/:id', (req, res) => {
	console.log('params::', req.params.id);
	//with json method we no need to stringify but if we use send method we need to stringify.
	res.json({id:req.params.id});
})

//Post request members
router.post('/', (req, res) => {
	//returning the requested payload but we need to setup the body parser to get the value in response.
	// app.use(express.json())// this is for sending the json data 
	// app.use(express.urlencoded({extended:false}));// this is for sending form data
	//we need the support of middleware to send the body data in response. either form data or json(object)
	console.log(req.body);
	const newMember = {
		id:uuid.v4(),
		name:req.body.name,
		email:req.body.email,
		status:'active'
	}
	console.log(!newMember.email);
	if (!newMember.name || !newMember.email) {
		return res.status(400).json({msg:'Please include name and email'});
	}
	//send the whole data
	members.push(newMember);
	//send will send the buffer, array string object etc..
	//json will send the JSON.stringify object in json format of array, string, object not Buffer.
	res.json(members);
})

//PUT request.
router.put('/:id', (req, res) => {
	console.log('params::', req.params.id);
	//check if id is existing..
	const found = members.some(member => member.id === parseInt(req.params.id));
	if(found){
		const updateMember = req.body;
		members.forEach(member => {
			if(member.id === parseInt(req.params.id)){
				//update the requested name and email..
				member.name = updateMember.name ? updateMember.name : member.name;
				member.email = updateMember.email ? updateMember.email: member.email;

				res.status(200).json({msg:'Member is updated', member});
			}
		})
	} else{
		res.status(404).json({msg:`No member of ${req.params.id} found`});
	}
})

//PUT request.
router.delete('/:id', (req, res) => {
	console.log('params::', req.params.id);
	//check if id is existing..
	const found = members.some(member => member.id === parseInt(req.params.id));
	if(found){
		members = members.filter(member => member.id !== parseInt(req.params.id));
		res.status(200).json({msg:'Member is deleted', members});
	} else{
		res.status(404).json({msg:`No member of ${req.params.id} found`});
	}
})


module.exports = router;