$(function() {

	// POST request - Creates a new user
	$('form').on('submit', function(event) {
		event.preventDefault();

		$.ajax({
			url: '/api/users',
			method: 'POST',
			data: $(this).serialize(),
			success: function() {
				console.log('user created successfully');
			},

			error: function(error) {
				console.log('error');
			}
		});

	});

});