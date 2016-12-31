$(function() {

  // @method: GET, POST, PUT, DELETE
  // @url: relative link to api end point
  // @dataType: xml, json, ..etc
  // @success: a function called when the request is successful
  // @error: a function called when request has an error

  $.ajax({
    method: 'GET',
    url: '/api/recipes' + '/' + $('#recipe_id').val(),
    dataType: 'json',
    success: function(data) {
      // Success case
      $('#recipe-name').text(data.name);
      $('#chef-name').text(data.first_name + ' ' + data.last_name);
      $('#directions').text(data.directions);

      var i;
      var str = "";
      for(i=0; i<data.ingredients.length; i++) {
      	str += data.ingredients[i] + ', ';
      }
      str = str.substring(0, str.length - 1);
      $('#ingredients').html(str);

      
      str = "";
      for(i=0; i<data.tags.length; i++) {
      	str += data.tags[i] + ', ';
      }
      str = str.substring(0, str.length - 1);
      $('#tags').html(str);

    },
    error: function(error) {
      // Error case
      console.log(error);
    }
  })


});