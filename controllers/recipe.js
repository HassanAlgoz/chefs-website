var isLoggedIn = require('../utils').isLoggedIn;

module.exports = function(app, connection) {
	
	app.get('/recipe/:id', function(req, res) {
    res.render('recipe', { recipe_id: req.params.id });
  });

  app.get('/recipe-add', isLoggedIn, function(req, res) {
    res.render('recipe-add');
  });

  app.get('/recipe-edit/:id', isLoggedIn, function(req, res) {
    res.render('recipe-edit', { recipe_id: req.params.id });
  });

};
