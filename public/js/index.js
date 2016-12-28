$(function() {

  // @method: GET, POST, PUT, DELETE
  // @url: relative link to api end point
  // @dataType: xml, json, ..etc
  // @success: a function called when the request is successful
  // @error: a function called when request has an error

  $.ajax({
    method: 'GET',
    url: '/api/users',
    dataType: 'json',
    success: function(data) {
      // Success case
      console.log(data);
    },
    error: function(error) {
      // Error case
      console.log(error);
    }
  })


});