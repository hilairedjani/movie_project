    			COMP 2406B PROJECT CHECK IN 1

All html files are in client/src
All css files are in client/assets/stylesheets
All javascript files are in in client/assests/javascript

    README Requirements:

1.  PROJECT:

    - Movie Database Project

2.  GROUP MEMBERS:

    - Hilaire Djani
    - Ebubechukwu Okelekwe

3.  DESCRIPTION OF FILES:

    - Accounttype.html: This file is a webpage outlining a users account information. The information present includes the username, account type (user or contributer),
      a link to the users contributions/reviews page(link would only work when a user has enabled a contributer account), people which outlines all the actor, writers and
      directors said user follows and finally followers and following which outlines the other users said user is either following or being followed by.

    - ViewContributions.html: This file is a webpage that shows the users previous reviews and also offers the user the ability to edit and add new reviews.

    - AddContributions.html: This file is a webpage that shows the different pieces of information required to make a contribution/review. The information required are as follows: title,

    description, runtime, year, budget, rating(Pg, R, Family), director(s), writer(s) and actor(s).

    - Index.html: This file is a webpage that outlines the movie site. It includes a search bar, register and login buttons as well as images that would be displayed and links to other

    portals the site contains.

    - movie.html: Displays a signle movie with all of its details (title, year, runtime, genre, cast, director, etc)

    - index.js: This javascript file creates a dynamic and interactive experince for users, in this case sources for searched movies through the Index.html portal.

    - index.css: Main stylesheet file for project front-end

    - accounttype.css: This css files styles Accounttype.html

4.  OBJECTS USED:

    - People: This conatins data about various actors, writers and directors, said data would include full names of performers as wellas other important and movie related information.

      Fields:

      - First name
      - Last name
      - rank [:actor, :director, :writer]

    - Pages:This deals with the various pages and pop ups in the project ie the register, log in, home page, user page, movie page and people page.

    - Movie: This is the information on various categories that make up a movies data ie the title, runtime, budget, rating, plot, rating, genre, the names of all actors, writers and
      directors.

      Fields:

      - Title
      - Release year
      - Writers
      - Actors
      - Genre
      - Runtime
      - Plot
      - Rating

    - User: This is the individual navigating the website. Each individual would require their full name, username, email and password they would also be given the ability to choose between
      a regular user account and a contributer account.

      Fields:

      - First name
      - Last name
      - email
      - password
      - role [:contributor, :user]
      - username

    - Review/Contributions: This handles all reviews or contributions made throughout the website. Reviews would include a value( value would be out of ten and can contain one decimal place) and
      a short description of users opinion on the movie.
      Fields:

      - value
      - description

5.  SETUP INSTRUCTIONS

    - The project contains a backend server which is not fully setup
    - For now, to explore the project, simply double-click on the static html pages found in "client/src" file to open them in a browser window

6.  ADDITIONAL DYNAMIC BEHAVIOUR
    Dynamic behaviour was added using bootstrap
    - Opening login/register modal
    - Display and animate carousel
