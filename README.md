==================================
COMP 2406B PROJECT CHECK IN 3
=================================

README Requirements:

1.  PROJECT

    - Movie Database Project

2.  GROUP MEMBERS

    - Hilaire Djani
    - Ebubechukwu Okelekwe

3.  OPEN STACK INSTRUCTIONS

    - Instance information:
      - Public Key: "134.117.129.59"
      - Password: "password"
      - Username: "student"
    - Setup instructions
      - ssh into open stack instance using the command "ssh student@134.117.129.59"
      - Provide the password "password"
      - Once in the instance, change the environment to production by running "export NODE_ENV=production" (This is because we are using a deployed mongodb database for our openstack instance)
      - cd into the project folder "movie_project"
      - Start the server by running the command "npm start"
      - Login with user email: "user1@test.com", password: "password" or register a new user
      - Enjoy!!!

4.  INSTALLATION AND TEST INSTRUCTIONS
    You will need to have mongodb installed locally to run the project from zip
    To install and setup the project:

    - Unzip the project folder
    - Run the command 'npm install' to install node modules
    - Start the mongo daemon with the command "mongod --dbpath=db-mongo
    - Run the command 'npm run seed' to seed test data into the database
    - Run the project with the command 'npm start'

    To test the project:

    - You will need postman to test the project's api routes
    - Enter the route url for the api route you want to test
    - Enter the corresponding query parameters
    - Make the request on postman and observe the output

5.  FILES/FOLDERS

    - routes
      - The api folder in the routes folder contains all the api route endpoints for the app
        - auth.js - contains authentication routes (register, login)
        - user.js - contains user related routes (e.g. get user by id, esiting user accounts/profiles)
        - movies.js - contains movie related routes (e.g. get user a list of movies)
        - people.js - contains people related routes (e.g. get an actor by id)
        - review.js - contains review related routes( e.g. get a movie/user review)
    - controllers/

      - This folder contains all controller actions to handle api requests
        - auth.js - contains controller actions to handle auth requests
        - users.js - contains controller actions to handle user requests
        - movies.js - contains controller actions to handle movie requests
        - people.js - contains controller actions to handle people requests
        - review.js - contains controller actions to handle review requests

    - models/

      - This folder contains logic for the project's models (i.e user, person, e.t.c)
      - user.js - contains logic for the user model
      - person.js - contains logic for the person model
      - movie.js - contains logic for the movie model
      - review.js - contains logic for the review model
        - The backend logic for reviewing a movie was added but is pending frontend implementation

    - Other New Files
    - userprofile.pug - contains the basic information about the users account
    - movie.pug - displays basic information about a movie and also displays a movie review system
    - addmovie.pug - displays the form to be filled when adding a movie
      - seed.js - Contains the logic that parses through raw data, converts the data to a compatible type and seeds the project's database. This now makes use of a MongoDB database

6.  FURTHER INFORMATION

    - Session support was implemented both frontend and backend using express-session
    - The review form logic on the frontend is still to be connected to the backend so doesn't work properly yet
    - The app uses a mongodb datase (mongod for development and a deployed mongodb cluster for production)
    - The app uses mongoose for database manipulation and queries
