var addToQuery = require('../utils.js').addToQuery;

module.exports = function(app, connection) {

	
	app.get('/api/chefs', function(req, res) {
		
		var query = 'SELECT * FROM users, chefs, WHERE users.id = chefs.id';

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


	

	app.get('/api/chefs/:id', function(req, res) {
		
		var query = 'SELECT * FROM users, chefs WHERE id = ' + req.params.id;
		query += ';';

		connection.query(query, function(err, rows, fields) {
			if (err) {
				console.error('err', err);
				return res.sendStatus(404);
			}
	    res.json(rows);
  	});
	});




	app.post('/api/chefs', function(req, res) {

		var query = 'INSERT INTO chefs SET ?';
		var set = {
			id: req.body.user_id,
			first_name: req.body.first_name,
			last_name: req.body.last_name,
			bio: req.body.bio
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




	app.put('/api/chefs/:id', function(req, res) {

		var query = 'UPDATE chefs SET ?';
		var set = {
			first_name: req.body.first_name,
			last_name: req.body.last_name,
			bio: req.body.bio
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



	app.delete('/api/chefs/:id', function(req, res) {

		var query = 'DELETE FROM chefs WHERE id = ' + req.params.id;
		console.log(query);

		connection.query(query, function(err, result) {
			if (err) {
				console.error('err', err);
				return res.sendStatus(404);
			}

			query = 'DELETE FROM users WHERE id = ' + req.params.id;
			connection.query(query, function(err, result) {
				if (err) {
					console.error('err', err);
					return res.sendStatus(404);
				}

				console.log('deleted ' + result.affectedRows + ' rows');
				res.sendStatus(204);
			})

		});

	});

};