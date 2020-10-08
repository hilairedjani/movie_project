function init() {
  fetchTopMovies();
}

function fetchTopMovies() {
  let topMovies = movies;
  displayTopMovies(topMovies);

  let request = new XMLHttpRequest();

  //   request.onreadystatechange = function () {
  //     if (this.readyState == 4 && this.status == 200) {
  //       topMovies = JSON.parse(this.responseText);
  //       displayTopMovies(topMovies);
  //     }
  //   };

  //   request.open("GET", "/top-movies");
  //   request.send();
}

function displayTopMovies(movies) {
  const moviesContainer = $("#top-movies");
  const moviesIndicators = $("#top-movies-carousel-indicators");
  const moviesCarouselInner = $("#top-movies-carousel-inner");

  for (let i = 0; i < movies.length; i++) {
    moviesIndicators.append(
      `<li data-target="#top-movies" data-slide-to="${i}"></li>`
    );

    moviesCarouselInner.append(
      `<div class="carousel-item movie-list-item ${i == 0 ? "active" : ""}" >
        <img src="${
          movies[i].Poster
        }" class="d-block w-100" height="750 alt="...">
        <div class="carousel-caption d-none d-md-block bg-dark">
            <h5>${movies[i].Title}</h5>
            <p>${movies[i].Plot}</p>
        </div>
    </div>`
    );
  }
}

function displayMovie(index) {}
