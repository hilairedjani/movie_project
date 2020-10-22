const rawMovies = require(movie-data-short.json);
const movies = [];
const people = [];
let movieCount = 0;
let peopleCount = 0;

for(movieRaw of rawMovies){
	movieCount++;

	let movieObject = {};
	let movieObject.id = movieCount;
	let movieObject.title = movieRaw.Title;
	let movieObject.releaseYear = movieRaw.Year;
	let movieObject.writers = movieRaw.Writer;
	let movieObject.actors = movieRaw.Actors;
	let movieObject.director = movieRaw.Director;
	let movieObject.genre = movieRaw.Genre;
	let movieObject.runtime = movieRaw.Runtime;
    let movieObject.plot = movieRaw.Plot;
    let movieObject.rating = movieRaw.Rated;
    let movieObject.country = movieRaw.Country;

    let actorsRaw = movie.Actors.split(", ");

    for(actorRaw of actorsRaw){
    	let firstname = actorRaw.split(" ")[0];
    	let lastname = actorRaw.split(" ")[1];

    	for(person of people){
    		if ((person.name == name) && (person.rank == actor) ){
    			break;
    		}

    		else
    			peopleCount++;
    		let personObject = {};
    		personObject.id = peopleCount;
    		personObject.rant = "actor" people.push();
    	}
     movieObject.actors.push(personObject.id)
    }

 let directorsRaw = movie.Directors.split(", ");

    for(directorRaw of directorsRaw){
    	let firstname = directorRaw.split(" ")[0];
    	let lastname = directorRaw.split(" ")[1];

    	for(person of people){
    		if ((person.name == name) && (person.rank == director) ){
    			break;
    		}

    		else
    			peopleCount++;
    		let personObject = {};
    		personObject.id = peopleCount;
    		personObject.rant = "director" people.push();
    	}
     movieObject.directors.push(personObject.id)
    }

    let writersRaw = movie.Writers.split(", ");

    for(writerRaw of writersRaw){
    	let firstname = writerRaw.split(" ")[0];
    	let lastname = writerRaw.split(" ")[1];

    	for(person of people){
    		if ((person.name == name) && (person.rank == writer) ){
    			break;
    		}

    		else
    			peopleCount++;
    		let personObject = {};
    		personObject.id = peopleCount;
    		personObject.rant = "writer" people.push();
    	}
     movieObject.directors.push(personObject.id)
    }

}
