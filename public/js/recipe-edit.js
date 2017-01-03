$(function() {

  // @method: GET, POST, PUT, DELETE
  // @url: relative link to api end point
  // @dataType: xml, json, ..etc
  // @success: a function called when the request is successful
  // @error: a function called when request has an error

  $('form').on('submit', function(e) {
    e.preventDefault();

    $.ajax({
      method: 'PUT',
      url: '/api/recipes' + '/' + $('#recipe_id').val(),
      data: $(this).serialize(),
      success: function(data) {
        // Success case
        location.href = '/profile';
      },
      error: function(error) {
        // Error case
        console.log(error);
      }
    })

  })

  $.ajax({
    method: 'GET',
    url: '/api/recipes' + '/' + $('#recipe_id').val(),
    dataType: 'json',
    success: function(data) {
      // Success case
      console.log(data);
      $('#recipe-name').text(data.name);
      $('#chef-name').text(data.first_name + ' ' + data.last_name);
      $('#name').val(data.name);
      $('#image').val(data.image);
      $('#directions').val(data.directions);
      $('#ingredients').val(data.ingredients);
      $('#tags').val(data.tags);

    },
    error: function(error) {
      // Error case
      console.log(error);
    }
  })


  $('button#delete-recipe').on('click', function(e) {
    e.preventDefault();

    $.ajax({
      method: 'DELETE',
      url: '/api/recipes' + '/' + $('#recipe_id').val(),
      dataType: 'json',
      success: function(data) {
        // Success case
        location.href = '/profile';
      },
      error: function(error) {
        // Error case
        console.log(error);
      }
    })
  
  })


});