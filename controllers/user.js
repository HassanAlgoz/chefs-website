var isLoggedIn = require('../utils').isLoggedIn;

module.exports = function(app, connection) {
	
	app.get('/profile', isLoggedIn, function(req, res) {
    res.render('profile');
  });

  app.get('/profile/edit', isLoggedIn, function(req, res) {
    res.render('profile-edit');
  });

  app.get('/user/:id', function(req, res) {
    res.render('profile', { user_id: req.params.id });
  });

};
