
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

        if (recipe.chef_id !== null) {
          str += `
            <small>
            <a href="/chef/${recipe.chef_id}">${recipe.first_name} ${recipe.last_name}</a>
            - ${recipe.posted_at}
            </small>
          `;
        } else {
          str += `
            <small>
              Anonymous
              - ${recipe.posted_at}
            </small>
          `;
        }
        
        str += `
          <a href="/recipe/${recipe.recipe_id}" class="clickable">
            <ul class="inline-list">

            </ul>
            <ul id="tags" class="inline-list">

            </ul>
            <p>${recipe.directions.substring(0, 256).trim()}...</p>
          </a>
        `;
      }

      $('#results').html(str);

      // for(j=0; j<recipe.tags.length; j++) {
      //   $('#tags').append(`<li>${recipe.tags[j]}</li>`);
      // }

      // for(j=0; j<recipe.ingredients.length; j++) {
      //   $('#ingredients').append(`<li>${recipe.ingredients[j]}</li>`);
      // }
      
      

    },
    error: function(error) {
      // Error case
      console.log(error);
    }
  })

  })


});