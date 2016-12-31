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
      	str += '<li>';
      	str += data.ingredients[i]
      	str += '</li>';
      }
      $('#ingredients').html(str);

      // str = "";
      // for(i=0; i<data.tags.length; i++) {
      // 	str += '<li>';
      // 	str += data.tags[i]
      // 	str += '</li>';
      // }
      // $('#tags').html(str);

      str = "";
      for(i=0; i<data.comments.length; i++) {
      	var comment = data.comments[i];
      	str += `
					<li>
						<a href="/users/${comment.user_id}"><img src="${comment.picture}" alt="user pic">
							<span class="commenter-name">${comment.username}</span>
						</a> - <span class="comment-date">${comment.posted_at}</span>

						<p class="comment-body">
              ${comment.body}
						</p>
					</li>
      	`;
      }
      $('#comments').html(str);

    },
    error: function(error) {
      // Error case
      console.log(error);
    }
  })


  $('form').on('submit', function(event) {
    event.preventDefault();

    $.ajax({
      method: 'POST',
      url: '/api/recipes' + '/' + $('#recipe_id').val() + '/comments',
      data: {
        body: $('#comment-body').val()
      },
      success: function(data) {
        // Success case
        // location.reload();
      },
      error: function(error) {
        // Error case
        console.log(error);
      }
    })

  })

  


});