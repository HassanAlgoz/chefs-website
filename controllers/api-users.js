var addToQuery = require('../utils.js').addToQuery;

module.exports = function(app, connection) {

	
	app.get('/api/users', function(req, res) {
		
		var query = 'SELECT * FROM `users`';

		query = addToQuery(query, req.query, 'username' );
		query = addToQuery(query, req.query, 'email' );
		query = addToQuery(query, req.query, 'role');

		if (req.query.orderby)
			query += ' ORDER BY ' + req.query.orderby;
		if (req.query.limit)
			query += ' LIMIT ' + req.query.limit;

		console.log(query);

		connection.query(query, function(err, rows, fields) {
			if (err) {
				console.error('err', err);
				return res.sendStatus(404);
			}
	    res.json(rows);
  	});
	});


	

	app.get('/api/users/:id', function(req, res) {
		
		var query = 'SELECT * FROM `users` WHERE `id` = ' + req.params.id;

		connection.query(query, function(err, rows, fields) {
			if (err) {
				console.error('err', err);
				return res.sendStatus(404);
			}
	    res.json(rows);
  	});
	});




	app.post('/api/users', function(req, res) {

		var query = 'INSERT INTO users SET ?';
		var set = {
			username: req.body.username,
			password: req.body.password,
			email: req.body.email
		}
		
		console.log(query);
		console.log(set);
		connection.query(query, set, function(err, result) {
			if (err) {
				console.error('err', err);
				return res.sendStatus(404);
			}

			console.log('insertedId: ' + result.insertId);
			res.sendStatus(201);
		});

	});




	app.put('/api/users/:id', function(req, res) {

		var query = 'UPDATE users SET ?';
		var set = {
			username: req.body.username,
			password: req.body.password,
			email: req.body.email,
			role: 'member'
		}
		query += ' WHERE id = ' + req.params.id;
		
		console.log(query);
		console.log(set);
		connection.query(query, set, function(err, result) {
			if (err) {
				console.error('err', err);
				return res.sendStatus(404);
			}

			console.log('insertedId: ' + result.insertId);
			res.sendStatus(201);
		});

	});



	app.delete('/api/users/:id', function(req, res) {

		var query = 'DELETE FROM users WHERE id = ' + req.params.id;		
		console.log(query);

		connection.query(query, function(err, result) {
			if (err) {
				console.error('err', err);
				return res.sendStatus(404);
			}

			console.log('deleted ' + result.affectedRows + ' rows');
			res.sendStatus(204);
		});

	});

};