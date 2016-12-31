var async = require('async');

var isLoggedIn = require('../utils').isLoggedIn;
var addToQuery = require('../utils.js').addToQuery;
var addToQueryLike = require('../utils.js').addToQueryLike;

module.exports = function(app, connection) {

	
	app.get('/api/recipes', function(req, res) {
		
		var query = 'SELECT *, recipes.id AS recipe_id FROM recipes LEFT JOIN chefs ON chefs.id = recipes.chef_id';

		query = addToQuery(query, req.query, 'chef_id');
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
		var query = 'SELECT * FROM recipes JOIN chefs ON chefs.id = recipes.chef_id WHERE recipes.id = ' + recipe_id;

		// list comments
		query += ';';
		query += `SELECT username, picture, comments.user_id, comments.body, comments.posted_at FROM comments
			JOIN users ON comments.user_id = users.id
			WHERE recipe_id = ${recipe_id}
			ORDER BY posted_at`;

		// list ingredients
		query += ';';
		query += 'SELECT * FROM ingredients WHERE recipe_id = ' + recipe_id;

		// list tags
		query += ';';
		query += 'SELECT * FROM tags WHERE recipe_id = ' + recipe_id;

		connection.query(query, function(err, result, fields) {
			if (err) {
				console.error('err', err);
				return res.sendStatus(404);
			}

			result = {
				recipe_id: result[0][0].id,
				chef_id: result[0][0].chef_id,
				first_name: result[0][0].first_name,
				last_name: result[0][0].last_name,
				name: result[0][0].name,
				directions: result[0][0].directions,
				hits: result[0][0].hits,
				posted_at: result[0][0].posted_at,
				comments: result[1],
				ingredients: result[2],
				tags: result[3]
			};

			result.ingredients = result.ingredients.map((x) => {
				return x.name;
			})

			result.tags = result.tags.map((x) => {
				return x.name;
			})

			res.json(result);


		});

	});




	app.post('/api/recipes', isLoggedIn, function(req, res) {

		var query = 'INSERT INTO recipes SET ?';
		var set = {
			name: req.body.name,
			directions: req.body.directions,
			image: req.body.image,
			chef_id: req.user.id,
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
							tag_id: tags[i]
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


	app.post('/api/recipes/:id/comments', isLoggedIn, function(req, res) {

		var query = 'INSERT INTO comments SET ?';
		var set = {
			body: req.body.body,
			recipe_id: req.params.id,
			user_id: req.user.id,
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


	app.put('/api/recipes/:id', isLoggedIn, function(req, res) {

		var query = 'UPDATE recipes SET ? WHERE id = ' + req.params.id;
		var set = {
			name: req.body.name,
			directions: req.body.directions,
			image: req.body.image,
			chef_id: req.user.id
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




