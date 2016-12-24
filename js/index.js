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
      var str = "<ul>";

      for(var i=0; i<data.length; i++) {
        console.log(data[i].username);
        console.log(data[i].email);
        str += '<li>'+ data[i].username +'</li>';
      }
      str += '</ul>'
      $('#content').html(str);
    },
    error: function(error) {
      // Error case
      console.log(error);
    }
  })


});