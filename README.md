# README
## Project Directories Structure
- /public for all front-end assets (img, css, js).
- /view for html files with .ejs extension.
- /public/js/lib for javascript libraries such as jQuery.
- /public/img for images.

From now on, .html files are .ejs. They won't display properly unless you start the server. and navigate to the URL of that page.
### Setup The Server
- [Download Nodejs](https://nodejs.org/en/)
- [Download XAMPP](https://www.apachefriends.org/index.html)

#### Nodejs
Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine. Basically, it let's JavaScript code run on the PC rather than in the browser.

#### XAMPP
XAMPP provides an interface to the database. After you run XAMPP, 'start' both Apache, and MySQL. After that, go to your browser and type: **localhost/phpmyadmin**. That will open the interface to the MySQL database.


### Run The Server
You must first make sure that XAMPP is running. Then, navigate to the project through the command line, and run `npm install` then run `node app.js`. That will start the nodejs server. You can then go to the URL **localhost:3000** where the home page is supposed to be displayed.

### Stop The Server
- Press `Ctrl+C` in the command line to stop nodejs.
- Open XAMPP and stop both Apache, and MySQL.


#### Adding Pages
When adding a new page, notify me so that I can update the server routing accordingly.



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


## JSON
We need to make HTTP 'requests' to the backend API. All HTTP requests are followed by a 'response' from the server. We expect data formatted as JSON from the API when we use GET requests. There is a sample code in /js/index.js using the '$' object provided by the jQuery library.

## Sample REST API
| Route    |   HTTP Verb    |  Description |
|----------|:-------------:|--------------|
| /api/bears |  `GET` | Get all the bears. |
| /api/bears |  `POST` | Create a bear |
| /api/bears/:bear_id | `GET` | Get a single bear |
| /api/bears/:bear_id | `PUT` | Update a bear with new info |
| /api/bears/:bear_id | `DELETE` | Delete a bear |


## API Endpoints
- /api/users
- /api/users/:id
- /api/recipes
- /api/recipes/:id
- /api/chefs
- /api/chefs/:id
- /api/login - POST
- /api/logout - GET

## Pages
- [x] navbar
- [x] /
- [x] /profile
- [ ] /profile/edit
- [x] /search
- [ ] /recipe/:id (Recipe Page)
- [x] /recipe-add
- [ ] /recipe-edit/:id
- [x] /login
- [x] /signup
- [ ] /chefs/:id
- [ ] /users/:id
- [ ] footer

Please make sure your pages is consistent with the colors we've chosen:
- red: #ea5b31
- orange: #F9A825
- dark-gray: #333

## SQL
- [ ] A statement to search recipes & retrieve all their information. (For the search page)


## SQL "Reports"
- [ ] Top three recipes of the month
- [ ] Annual number of registered users
- [ ] Top chefs of the month
- [ ] Number of site hits per month
- [ ] Most active users of the week
