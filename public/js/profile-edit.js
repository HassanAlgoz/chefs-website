$(function() {

  // @method: GET, POST, PUT, DELETE
  // @url: relative link to api end point
  // @dataType: xml, json, ..etc
  // @success: a function called when the request is successful
  // @error: a function called when request has an error

  $.ajax({
    method: 'GET',
    url: '/api/users' + '/' + $('#user_id').val(),
    dataType: 'json',
    success: function(data) {
      // Success case
      var user = data[0];

      $('#username').val(user.username);
      $('#email').val(user.email);
      $('#picture').val(user.picture);
      $('#birth_date').val(user.birth_date);
      $('#bio').val(user.bio);


      if (parseInt(user.is_chef) === 1) {
         $.ajax({
          method: 'GET',
          url: '/api/chefs' + '/' + $('#user_id').val() + '/social_links',
          dataType: 'json',
          success: function(social_links) {
            console.log(social_links);
            $('#social_links').text(social_links.join('\n'));
          },
          error: function(error) {
            console.log(error);
          }
        });
      }

      
    },
    error: function(error) {
      // Error case
      console.log(error);
    }
  })

  $('form').on('submit', function(event) {
    event.preventDefault();

    $.ajax({
      method: 'PUT',
      url: '/api/chefs' + '/' + $('#user_id').val(),
      data: $(this).serialize(),
      success: function(data) {
  
      },
      error: function(error) {
        // Error case
        console.log(error);
      }
    })

  })


});