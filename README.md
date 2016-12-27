# README
## Project Directories Structure
- /view is the folder in which .html files live.
- /js/lib contains useful javascript libraries such as jQuery.


## Helpful links
- [W3 How TO](http://www.w3schools.com/howto/default.asp)
- [HTML & CSS Tutorials](https://www.youtube.com/watch?v=zlT28HdYe3A&index=9&list=PLYxzS__5yYQk3V3b8yJZfyH-cX4LbgyYj)
- [Material UI](https://www.materialui.co/)
- [Buttons with jQuery](https://www.youtube.com/watch?v=0m5ytkr25ug)


## git Commands
- git clone
- git status
- git add
- git commit -am "Your commit message"
- git push
- git pull


## colors
- nav #ea5b31
- highlighting #F9A825
- footer #333



## JSON
We need to make HTTP 'requests' to the backend API. All HTTP requests are followed by a 'response' from the server. We expect data formatted as JSON from the API when we use GET requests. There is a sample code in /js/index.js using the '$' object provided by the jQuery library.
- To retrieve data, use the GET request, and modify the HTML.
- To submit forms, use the POST request.
- To submit forms, but signify editing existing information, use PUT request.
- To submit a request of deletion, use the DELETE request.


## API Endpoints
- /api/users
- /api/users/id
- /api/recipes
- /api/recipes/id
- /api/chefs
- /api/chefs/id
- /api/login - POST
- /api/logout - GET
- Note: id is a number

