{
	const
		express = require('express'),
		mongoose = require('mongoose'),
		bcrypt = require('bcrypt'),
		bodyParser = require('body-parser'),
		path = require('path'),
		jwt = require('jsonwebtoken'),
		User = require('./User.model');

    const router = express.Router();
	var app = express();

	process.env.SECRET_KEY = "secret1111ljlkjlkjkljkljkljhhghffsewqaw";

	app.use(bodyParser.json());
	
	mongoose.connect('mongodb://localhost:27017/userslist', function (err) {
		if (err) {
			return console.error(err);
		}

		console.log('Successfully connected to MongoDB');
	});

	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));

	router.get('/users', function (req, res, next) {
		User.find({})
			.then((users) => {
				res.json(users);
			})
			.catch((err) => {
				res.status(500).json({error: 'Internal server error...'});
			});
	});

	router.get('/user/:id', function (req, res, next) {
		User.findOne({'_id' : req.params.id})
			.then((user) => {
				res.json(user);
			})
			.catch((err) => {
				res.status(404).json({error: 'User with this defined id not found'});
			});
	});

	router.post('/user', function (req, res, next) {
		var newUser = new User(req.body);

		newUser.save()
			.then(() => {
				res.json(req.body);
			}) 
			.catch((err) => {
				res.status(500).json({error: 'Bad data...'});
			});
	});

	router.delete('/user/:id', function (req, res, next) {
		var info = jwt.verify(req.query.token, process.env.SECRET_KEY);

		if (info._doc.role == 'admin') {
			User.findOneAndRemove({'_id' : req.params.id})
				.then((user) => {
					res.json(user);
				})
				.catch((err) => {
					res.send(err);
				});
		} else {
			res.status(404).json({error: 'you have not enough privileges to perform this operation'});
		}
	});

	router.put('/user/:id', function (req, res, next) {
		var info = jwt.verify(req.query.token, process.env.SECRET_KEY);

		if (info._doc.role == 'admin') {
			User.findOneAndUpdate({'_id' : req.params.id}, 
							{$set: {firstname: req.body.firstname, lastname: req.body.lastname, email: req.body.email, dateofbirth: req.body.dateofbirth, password: req.body.password, role: req.body.role}},
							 {new: true})
							 .then((doc) => {
							 	res.json(doc);
							 }) 
							 .catch((err) => {
							 	res.send(err);
							 });
		} else {
			res.status(404).json({error: 'you have not enough privileges to perform this operation'});
		}
	});

	router.get('/authorization/user', function (req, res, next) {
		var query = User.where({'email' : req.query.email});
		
		query.findOne(function (err, user) {
		  	if (err) res.send(err);

		  	if (user == null) {
		  		res.json({token: 'error'});	
		  	} else {
		  		user.comparePassword(req.query.password, function (err, isMatch) {
					if (err) res.send(err);
					
					if (isMatch) {
						var generatedToken = jwt.sign(user, process.env.SECRET_KEY, {expiresIn: '3 days'});
						res.json({token: generatedToken});
					} else {
						res.json({token: 'wrong data'});
					} 
				});   
		  	}			  	
		});	
	});	

	router.get('/authorized', function (req, res, next) {
		var info = jwt.verify(req.query.token, process.env.SECRET_KEY);
		res.json({role: info._doc.role});
	});

	router.get('/users/searchbylastname', function (req, res, next) {
		User.find({'firstname': req.query.firstname, 'lastname': req.query.lastname})
			.then((users) => {
				res.json(users);
			})
			.catch((err) => {
				res.send(err);
			});
	});

	router.get('/users/searchbyemail', function (req, res, next) {
		User.find({'firstname': req.query.firstname, 'email': req.query.email})
			then((users) => {
				res.json(users);
			})
			.catch((err) => {
				res.send(err);
			});
	});	

	router.get('/users/pagination', function (req, res, next) {
		var skipAmount = req.query.amount * (req.query.currpage - 1);
		User.find().skip(skipAmount).limit(req.query.amount)
			.then((users) => {
				res.json(users);
			})
			.catch((err) => {
				res.send(err);
			});
	});

	module.exports = router;
}