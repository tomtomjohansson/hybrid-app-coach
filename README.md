# Hybrid app - Like A Pro
###### This mobile app is intended for lower level football coaches and provides a simple and relatively effortless way to get a lot of statistics about the players in the team and the performances of the team.

## Technologies
This app is built with the MEAN-stack (MongoDB, Express, AngularJS, Node.js). It uses Mongoose as an ODM for MongoDB and uses Angular-UI-router for routing in the app. User authentication handled by Passport and JsonWebToken. The ionic framework provides css- and js-components designed specifically for an optimized mobile experience.

## Starting the app
In all cases you will need to have these things installed on your computer:
Node.js
NPM
MongoDB
Since this app uses MongoDB, you will need to know the basics of how to run that.

##### For viewing purposes only
1. Fork the repository
2. Navigate to the root directory of the project in your command-line.
3. Type in "npm install --production". This will install dependencies.
4. Type in "npm start". This will start the express-server.
5. In another command-line tab type "ionic serve" or "ionic serve -l". The app should open automatically in your browser.

##### For editing purposes
Follow the same steps as above but instead of "npm install --production" type in "npm install".

## Directory structure
```javascript
src/
----api/
--------search.js
--------games.js
--------players.js
--------users.js
----models/
--------assistant.js
--------featureController.js
--------featureDirective.js
----Passport/
--------passport.js
----database.js
www/
----app/
--------factories/
------------angular factories
--------features in angular/
------------controllers
------------templates
------------directives
--------config.js
----css/
--------ionic.app.css
--------ionic.app.min.css
----img/
--------jpg-files
----lib/
--------ionic library css and js
----js/
--------main.js
----scsss/
--------all scss-files
--------index.html
server.js
```
##### WWW directory
The subfolder "app" contains the Angular-app, setup with Angular-UI-router.
The structure is feature based rather than type based.
Worth noting is that all js-files in this directory is being bundled by Gulp into the file "main.js" found in the js-subfolder.
* The "config.js"-file defines the app and its dependencies. Also contains the routing-system.
* The factories contains factories shared by controllers. Mainly used for ajax-calls to backend.
* Since the structure is feature based there is subfolders for every feature - for example the navigation or the code for user pages. This is loosely based around each UI-view, but not entirely. Some UI-views share a folder. These subfolders contains templates, controllers, and directives.
The subfolder css contains a minified css-file and a regular css-file. The files are compiled from scss-files in scss-folder.
Scss-folder contains scss-files.
lib-folder contains entire ionic-library. Js-files and Css-files.
Index.html is the main html-file.

##### Src directory
Contains setup for an express api that the angular-app communicates with. Also sets up the database.
* The api-subfolder contains four files. "users.js" is used for authentication. Logging in users and registering users. "search.js", "players.js" and "games.js" is the main api that takes care of get, post, put and delete requests to the database.
* The models-subfolder contains the file "assistant.js" where a mongoose-schema is defined and a model is initiated. Model contains a schema for an assistant with two sub-schemas for games and players.
* "database.js" connects to MongoDB.

##### Root directory
Server.js sets up the server and contains basic settings for express and the routing on the backend-side.
Bunch of configuration files.
