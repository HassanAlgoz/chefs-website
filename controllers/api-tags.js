var addToQuery = require('../utils.js').addToQuery;

module.exports = function(app, connection) {

	
	// all tags table
	app.get('/api/tags', function(req, res) {
		
		var query = 'SELECT * FROM `tags`';

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


};




