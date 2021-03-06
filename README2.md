    			COMP 2406B PROJECT CHECK IN 2

    README Requirements:

1.  PROJECT

    - Movie Database Project

2.  GROUP MEMBERS

    - Hilaire Djani
    - Ebubechukwu Okelekwe

3.  INSTALLATION AND TEST INSTRUCTIONS
    To install and setup the project:

    - Unzip the project folder
    - Run the command 'npm install' to install node modules
    - Run the command 'npm run seed' to seed test data into the database

    To test the project:

    - You will need postman to test the project's api routes
    - Enter the route url for the api route you want to test
    - Enter the corresponding query parameters
    - Make the request on postman and observe the output

4.  FILES/FOLDERS

    - routes/api
      - The api folder in the routes folder contains all the api route endpoints for the app
      - auth.js - contains authentication routes (register, login)
      - user.js - contains user related routes (e.g. get user by id)
      - movies.js - contains movie related routes (e.g. get user a list of movies)
      - people.js - contains people related routes (e.g. get an actor by id)
    - controllers/
      - This folder contains all controller actions to handle api requests
      - auth.js - contains controller actions to handle auth requests
      - users.js - contains controller actions to handle user requests
      - movies.js - contains controller actions to handle movie requests
      - people.js - contains controller actions to handle people requests
    - models/

      - This folder contains logic for the project's models (i.e user, person, e.t.c)
      - user.js - contains logic for the user model
      - person.js - contains logic for the person model
      - movie.js - contains logic for the movie model

    - Other New Files
      - Popularmovies.pug - This displays the template for trending/popular movies
      - Movie.pug- This dispalys the template for a particular movie
      - seed.js - Contains the logic that parses through raw data, converts the data to a compatible type and seeds the project's database

5.  FURTHER INFORMATION

    - The app uses an express server
    - The app uses nodemon in development to automatically restart the server when changes are made
    - The app uses jquery for DOM manipulation on the client side
    - The app uses bootstrap as a client component framework
    - The app uses pug as template engine with server side rendering
    - The logic for logging in and registering was added (Minimally)
