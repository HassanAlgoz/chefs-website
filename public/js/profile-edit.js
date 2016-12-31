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
      $('#social_links').val(user.social_links);

      var i;
      var str = "";
      for(i=0; i<user.ingredients.length; i++) {
      	str += user.ingredients[i] + ', ';
      }
      str = str.substring(0, str.length - 1);
      $('#ingredients').html(str);

      
    },
    error: function(error) {
      // Error case
      console.log(error);
    }
  })


});