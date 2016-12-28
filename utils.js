module.exports = {

	addToQuery: function(query, reqQuery, q) {
		if (reqQuery[q]) {
			if (query.indexOf('WHERE') !== -1)
				query += ' AND ';
			else
				query += ' WHERE ';

			query += '`'+q+'` = "'+ reqQuery[q] + '"';
		}

		return query;

	},

	addToQueryLike: function(query, reqQuery, q) {
		if (reqQuery[q]) {
			if (query.indexOf('WHERE') !== -1)
				query += ' AND ';
			else
				query += ' WHERE ';

			query += '`'+q+'` LIKE "%'+ reqQuery[q] + '%"';
		}

		return query;

	},


	isLoggedIn: function (req, res, next) {
		
	  // if user is authenticated in the session, carry on
	  if (req.isAuthenticated())
	  	return next();

	  // if they aren't redirect them to the home page
	  res.redirect('/');
	}
	
}