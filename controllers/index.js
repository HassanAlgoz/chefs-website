module.exports = function(app, connection) {
	
	app.get('/', function(req, res) {
		res.render('home');
	});

	app.get('/search', function(req, res) {
		res.render('search');
	});

};
