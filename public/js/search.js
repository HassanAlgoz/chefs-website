
$(function() {

  // @method: GET, POST, PUT, DELETE
  // @url: relative link to api end point
  // @dataType: xml, json, ..etc
  // @success: a function called when the request is successful
  // @error: a function called when request has an error

  $('form').on('submit', function(event) {
    event.preventDefault();

    $.ajax({
      method: 'GET',
      url: '/api/recipes' +'?'+ $(this).serialize(),
      dataType: 'json',
      success: function(data) {
      // Success case

      var str = ""; 
      var i;
      for(i=0; i<data.length; i++) {
         
        var j;
        var recipe = data[i];
        console.log(recipe);

        str += '<hr>';

        if (recipe.chef_id !== null) {
          str += `
            <small>
            <a href="/chef/${recipe.chef_id}">${recipe.first_name} ${recipe.last_name}</a>
            - ${recipe.posted_at}
            </small>
          `;
        } else {
          str += `
            <small>Anonymous - ${recipe.posted_at}</small>
          `;
        }
        
        str += `
          <div class="col-left">
            <a href="/recipe/${recipe.recipe_id}" class="clickable">
              <img src="${recipe.image}" alt="Recipe's Image" />
            </a>
          </div>
          <div class="col-right">
            <a href="/recipe/${recipe.recipe_id}" class="clickable">
              <p>${recipe.directions.substring(0, 256).trim()}...</p>
            </a>
          </div>
        `;
        
        str += '<div class="clear"></div>';
      }

      $('#results').html(str);
      
      
      

    },
    error: function(error) {
      // Error case
      console.log(error);
    }
  })

  })


});