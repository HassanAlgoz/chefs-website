# README

1. Muath
2. Abdulaziz
3. Hassan
4. Abdullah

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


Please make sure your pages is consistent with the colors we've chosen:
- red: #ea5b31
- orange: #F9A825
- dark-gray: #333


## Pages
- [x] navbar
- [x] /
- [x] /profile
- [x] /profile/edit
- [x] /search
- [x] /recipe/:id
- [x] /recipe-add
- [x] /recipe-edit/:id
- [x] /login
- [x] /signup
- [x] /users/:id
- [x] footer

## SQL
- [x] A statement to search recipes based on name & retrieve all their information. (For the search page)
- [x] DML insert statements to insert the data in to tables.
- [x] DDL script /SQL statements used to create database objects
- [x] Select queries to satisfy the sample queries submitted in phase I
  - [x] List all recipes
  - [x] List all registered users who are chefs
  - [x] List all registered users including/excluding chefs
  - [x] List all comments made on a recipe
  - [x] List recipes ordered by the most liked recipe first
  - [x] List recipes with certain types of ingredients
  - [x] List recipes with certain tags attached to them
  - [x] Retrieve complete information about a certain chef
  - [x] Retrieve recipe ingredients, directions, and the date on which it was posted
  - [x] List recipes ordered by the date on which they were posted


### Other requirements
- [x] Physical (or internal) schema, i.e., file structure for each relation
- [x] The user manual (You can add snapshots of your screens along with explanations about how to use for users)
- [x] The conclusions (your own experiences)
- [x] Distribution of Project tasks (A table showing who did what)

## SQL "Reports"
- [x] Top three recipes of the month
- [x] Annual number of registered users
- [x] Top chefs of the month
- [x] Number of site hits per month
- [x] Most active users of the week
