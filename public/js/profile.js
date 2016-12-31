$(function() {

  // @method: GET, POST, PUT, DELETE
  // @url: relative link to api end point
  // @dataType: xml, json, ..etc
  // @success: a function called when the request is successful
  // @error: a function called when request has an error

  $.ajax({
    method: 'GET',
    url: '/api/users' +'/'+ $('#user_id').text(),
    dataType: 'json',
    success: function(data) {
      // Success case
      var user = data[0];
      console.log(user);
      if (user.is_chef > 0) {
        $('#username').text('Chef ' + user.username);
      } else {
        $('#username').text(user.username);
      }
      
      $('#email').text(user.email);
      $('#bio').text(user.bio);
      $('#user-picture').attr('src', user.picture);
    },
    error: function(error) {
      // Error case
      console.log(error);
    }
  })


  $.ajax({
    method: 'GET',
    url: '/api/recipes?chef_id=' + $('#user_id').text(),
    dataType: 'json',
    success: function(data) {
      // Success case
      var str = ""; 
      var i;
      for(i=0; i<data.length; i++) {
         
        var j;
        var recipe = data[i];
        console.log(recipe);

        str += `
          <hr>
          <div class="col-left">
            <a href="/recipe/${recipe.recipe_id}" class="clickable">
              <img src="${recipe.image}" alt="Recipe's Image" />
            </a>
          </div>
          <div class="col-right">
            <small>${recipe.posted_at}</small>
            <a href="/recipe/${recipe.recipe_id}" class="clickable">
              <ul id="ingredients" class="inline-list">

              </ul>
              <ul id="tags" class="inline-list">

              </ul>
              <p>${recipe.directions.substring(0, 400).trim()}...</p>
            </a>
          </div>

        `;
      }

      $('#recipes').html(str);
    },
    error: function(error) {
      // Error case
      console.log(error);
    }
  })


});