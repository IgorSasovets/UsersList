{
	const express = require('express');
	const router = express.Router();
	const mongoose = require('mongoose');
	const bcrypt = require('bcrypt');
	const bodyParser = require('body-parser');
	const path = require('path');
	const jwt = require('jsonwebtoken');
	var app = express();
	var User = require('./User.model');

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
		var query = User.find({});
			
		query.exec(function (err, users) {
			if (err) {
				res.send(err);
			} else {
				res.json(users);
			}
		});
	});

	router.get('/user/:id', function (req, res, next) {
		var query = User.findOne({'_id' : req.params.id});

		query.exec(function (err, user) {
			if (err) {
				res.send(err);
			} else {
				res.json(user);
			}
		});
	});

	router.post('/user', function (req, res, next) {
		var newUser = new User(req.body);

		newUser.save(function (err) {
			if (err) {
				res.send(err);
			} else {
				res.json(req.body);
			}
		}); 
	});

	router.delete('/user/:id', function (req, res, next) {
		var info = jwt.verify(req.query.token, process.env.SECRET_KEY);

		if (info._doc.role == 'admin') {
			var query = User.findOneAndRemove({'_id' : req.params.id});

			query.exec(function (err, user) {
				if (err) {
					res.send(err);
				} else {
					res.json(user);
				}
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
							 {new: true}, 
							 function (err, doc) {
							 	if (err) {
							 		return res.send(err);
							 	} else {
							 		res.json(doc);
							 	}
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
		var query = User.find({'firstname': req.query.firstname, 'lastname': req.query.lastname});
			
		query.exec(function (err, users) {
			if (err) {
				res.send(err);
			} else {
				res.json(users);
			}
		});
	});

	router.get('/users/searchbyemail', function (req, res, next) {
		var query = User.find({'firstname': req.query.firstname, 'email': req.query.email});
			
		query.exec(function (err, users) {
			if (err) {
				res.send(err);
			} else {
				res.json(users);
			}
		});
	});	

	module.exports = router;
}