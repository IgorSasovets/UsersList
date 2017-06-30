{
	const express = require('express');
	const path = require('path');
	const bodyParser = require('body-parser');

	const index = require('./routes/index');
	const users = require('./routes/users');

	process.env.PORT = 3000;

	var app = express();
	var port = process.env.PORT || 3000;;

	app.set('views', path.join(__dirname, 'views'));
	app.set('view engine', 'ejs');
	app.engine('html', require('ejs').renderFile);

	app.use(express.static(path.join(__dirname, 'client')));
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({extended: false}));

	app.use('/', index);
	app.use('/api', users);

	app.listen(port, function () {
		console.log(`Server started on port ${port}`);
	});		
}