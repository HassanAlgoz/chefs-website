// First, make sure you include the jquery library like so:
// <script src="../js/lib/jquery.min.js"></script>
// <script src="../js/myScript.js"></script>
// in the html file (the order matters)
// now you can use the '$' object to access the 'ajax' function


// Function parameters
// @method: GET, POST, PUT, DELETE
// @url: relative link to api end point
// @dataType: xml, json, ..etc
// @success: a function called when the request is successful
// @error: a function called when request has an error



// GET request - Get all users
$.ajax({
	url: '/api/users',
	method: 'GET',
	dataType: 'json', // Only on GET requests we expect json data to be returned by the server
	success: function(data) {
		// change the html,
		// while loop ..etc
	},

	error: function(error) {
		// error
		console.log(error);
	}
});


// POST request - Creates a new user
$('form').on('submit', function(event) {
	event.preventDefault(); // this prevents the form from submitting default stuff..

	$.ajax({
		url: '/api/users',
		method: 'POST',
		data: $(this).serialize(), // $(this) refers to the 'form', since we are inside 'form'
		success: function() {

		},

		error: function(error) {

		}
	});

});


// PUT request - Modify user by id
$('form').on('submit', function(event) {
	event.preventDefault();

	var userID = $('#userID').val(); // or $('#userID').text();

	$.ajax({
		url: '/api/users' + '/' + userID,
		method: 'PUT',
		data: $(this).serialize(),
		success: function() {

		},

		error: function(error) {

		}
	});

});


// DELETE request - Delete user by id
$('form').on('submit', function(event) {
	event.preventDefault();

	var userID = $('#userID').val(); // or $('#userID').text();

	$.ajax({
		url: '/api/users' + '/' + userID,
		method: 'DELETE',
		success: function() {

		},

		error: function(error) {

		}
	});

});