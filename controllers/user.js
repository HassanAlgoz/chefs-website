var isLoggedIn = require('../utils').isLoggedIn;

module.exports = function(app, connection) {
	
	app.get('/profile', isLoggedIn, function(req, res) {
    res.render('profile-chef');
  });

};
