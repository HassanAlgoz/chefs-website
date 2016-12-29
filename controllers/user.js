var isLoggedIn = require('../utils').isLoggedIn;

module.exports = function(app, connection) {
	
	app.get('/profile', isLoggedIn, function(req, res) {
    res.render('profile-chef');
  });

  app.get('/chef/:id', function(req, res) {
    res.render('profile-chef', { chef_id: req.params.id });
  });

  app.get('/user/:id', function(req, res) {
    res.render('profile-user', { user_id: req.params.id });
  });

};
