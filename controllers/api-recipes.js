var async = require('async');

var addToQuery = require('../utils.js').addToQuery;
var addToQueryLike = require('../utils.js').addToQueryLike;

module.exports = function(app, connection) {

	
	app.get('/api/recipes', function(req, res) {
		
		var query = 'SELECT * FROM `recipes`';

		query = addToQueryLike(query, req.query, 'name');

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


	

	app.get('/api/recipes/:id', function(req, res) {
		
		var recipe_id = req.params.id;
		var result; // rows
		var query = 'SELECT * FROM `recipes` WHERE `id` = ' + recipe_id;

		// list comments
		query += ';';
		query += 'SELECT * FROM comments WHERE recipe_id = ' + recipe_id + ' ORDER BY posted_at';

		// list ingredients
		query += ';';
		query += 'SELECT * FROM ingredients WHERE recipe_id = ' + recipe_id;

		// list tags
		query += ';';
		query += 'SELECT * FROM tags WHERE recipe_id = ' + recipe_id;
		query += ' JOIN tags_list ON tag_id = id';

		connection.query(query, function(err, rows, fields) {
			if (err) {
				console.error('err', err);
				return res.sendStatus(404);
			}

			result = rows;

			// get chef
			query = 'SELECT * FROM chefs WHERE id = ' + rows[0][0].chef_id;
			connection.query(query, function(err, rows, fields) {
				if (err) {
					console.error('err', err);
					return res.sendStatus(404);
				}

				res.json(result.concat(rows));

			});
			

		});

	});




	app.post('/api/recipes', function(req, res) {

		var query = 'INSERT INTO recipes SET ?';
		var set = {
			name: req.body.name,
			directions: req.body.directions,
			chef_id: req.body.chef_id,
			posted_at: new Date()
		}
		var ingredients = req.body.ingredients.trim().split(',');
		var tags = req.body.tags.trim().split(',');
		

		console.log(query);
		console.log(set);
		connection.query(query, set, function(err, result) {
			if (err) {
				console.error('err', err);
				return res.sendStatus(404);
			}


			async.waterfall([
				function(callback) {
					for(var i=0; i<ingredients.length; i++) {
						query = 'INSERT INTO `ingredients` SET ?';
						set = {
							recipe_id: result.insertId,
							name: ingredients[i]
						}

						console.log(query);
						connection.query(query, set, function(err, result) {
							if (err) {
								console.error('err', err);
								return res.sendStatus(404);
							}

							console.log('insertedId: ' + result.insertId);
							

						});
					}

					callback(null);
				},

				function(callback) {
					for(var i=0; i<tags.length; i++) {
						query += 'INSERT INTO `tags` SET ?';
						set = {
							recipe_id: result.insertId,
							tag_id: parseInt(tags[i])
						}

						console.log(query);
						connection.query(query, set, function(err, result) {
							if (err) {
								console.error('err', err);
								return res.sendStatus(404);
							}
							console.log('insertedId: ' + result.insertId);
						});
					}

					callback(null)
				},

				function() {
					res.sendStatus(201);
				}

			])
			
		});

	});


	app.post('/api/recipes/:id/comments', function(req, res) {

		var query = 'INSERT INTO comments SET ?';
		var set = {
			body: req.body.body,
			recipe_id: req.params.id,
			user_id: req.body.user_id,
			posted_at: new Date()
		}
		
		console.log(query);
		console.log(set);
		connection.query(query, set, function(err, result) {
			if (err) {
				console.error('err', err);
				return res.sendStatus(404);
			}

			res.sendStatus(201);

		});

	});


	app.put('/api/recipes/:id', function(req, res) {

		var query = 'UPDATE recipes SET ? WHERE id = ' + req.params.id;
		var set = {
			name: req.body.name,
			directions: req.body.directions,
			chef_id: req.body.chef_id
		}
		
		console.log(query);
		console.log(set);
		connection.query(query, set, function(err, result) {
			if (err) {
				console.error('err', err);
				return res.sendStatus(404);
			}

			// var query = 'DELETE FROM ingredients WHERE recipe_id = ' + req.params.id;
			// console.log(query);

			// connection.query(query, function(err, result) {
			// 	if (err) {
			// 		console.error('err', err);
			// 		return res.sendStatus(404);
			// 	}

			// 	query = 'INSERT INTO ingredients SET ?';
			// 	set = {
			// 		recipe_id: result.insertId,
			// 		name: req.body.ingredientName
			// 	}

			// 	connection.query(query, set, function(err, result) {
			// 		if (err) {
			// 			console.error('err', err);
			// 			return res.sendStatus(404);
			// 		}

			console.log('insertedId: ' + result.insertId);
			res.sendStatus(204);

			// 	});

			// });

		});

	});



	app.delete('/api/recipes/:id', function(req, res) {

		var query = 'DELETE FROM recipes WHERE id = ' + req.params.id;		
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


	app.delete('/api/comments/:id', function(req, res) {

		var query = 'DELETE FROM comments WHERE id = ' + req.params.id;
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




