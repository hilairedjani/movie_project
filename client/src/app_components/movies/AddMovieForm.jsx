import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createMovie, updateMovie } from "../../app_actions/movies";

const initialState = {
  title: "",
  releaseYear: "",
  genre: "",
  runtime: "",
  plot: "",
  rating: "",
  country: "",
  image: "",
  actors: [],
  directors: [],
  writers: [],
};

const AddMovieForm = ({ movieId = null, showSearchTitle = true, action }) => {
  const { error } = useSelector((state) => state.movies);
  const [formData, setFormData] = useState(initialState);
  const [searchPersonText, setSearchPersonText] = useState({
    writers: "",
    directors: "",
    actors: "",
  });

  const [showMovieNotFound, setShowMovieNotFound] = useState(false);

  const [choosePerson, setChoosePerson] = useState({
    actors: [],
    writers: [],
    directors: [],
  });

  const {
    title,
    releaseYear,
    genre,
    runtime,
    plot,
    rating,
    country,
    image,
    writers,
    directors,
    actors,
  } = formData;

  const dispatch = useDispatch();
  const history = useHistory();

  const fetchMovieAndPopulateForm = async (_id) => {
    try {
      const response = await axios.get(`/movies/${_id}`);
      const { data: movie } = response;

      if (movie) {
        setFormData({ ...formData, ...movie });
      } else {
        setFormData({ ...formData, ...initialState });
      }
    } catch (error) {}
  };

  useEffect(() => {
    // Fetch movie if id is present
    if (movieId) fetchMovieAndPopulateForm(movieId);
    return () => {};
  }, [movieId]);

  const searchPerson = async (type, name) => {
    try {
      if (name.length < 3) {
        setChoosePerson({ ...choosePerson, [`${type}`]: [] });
        return;
      }

      const response = await axios.get(
        `/people?name=${name}&rank=${type.slice(0, -1)}`
      );
      setChoosePerson({ ...choosePerson, [`${type}`]: response.data.people });
    } catch (error) {}
  };

  // Add person to list of people
  const addPerson = (type, newPerson) => {
    let arr = formData[`${type}`];
    for (let i = 0; i < arr.length; i++) {
      if (arr[i]._id == newPerson._id) return;
    }

    setFormData({ ...formData, [`${type}`]: [...arr, newPerson] });
    setChoosePerson({ ...choosePerson, [`${type}`]: [] });
    setSearchPersonText({
      ...searchPersonText,
      [`${type}`]: "",
    });
  };

  // Extract only people ids from array of people
  const extractPeopleIds = (people) => {
    return people.map((person) => person._id);
  };

  // Split string of genres into array
  const splitGenres = (genres) => {
    return genres.split(/[ ,]+/);
  };

  // Remove person from list of people
  const removePerson = (type, _id) => {
    let arr = formData[type];

    setFormData({
      ...formData,
      [`${type}`]: arr.filter((el) => el._id != _id),
    });
  };

  const handleSearchMovie = async (t) => {
    try {
      setShowMovieNotFound(false);
      if (t.length < 1) return;

      const title = t.replace(/\s+/g, "+");
      const response = await axios.get(`/movies/scraper/title/${title}`);
      const { movie } = response.data;

      if (movie) {
        setFormData({ ...formData, ...movie });
      } else {
        setFormData({ ...formData, ...initialState });
      }
    } catch (error) {
      setShowMovieNotFound(true);
      setFormData({ ...formData, ...initialState });
    }
  };

  const onChange = (event) =>
    setFormData({ ...formData, [event.target.name]: event.target.value });

  const onSubmit = async (event) => {
    event.preventDefault();

    const {
      title,
      releaseYear,
      genre: genreString,
      runtime,
      plot,
      rating,
      country,
      image,
      actors: actorsArr,
      writers: writersArr,
      directors: directorsArr,
    } = formData;

    // Extract people ids
    const actors = extractPeopleIds(actorsArr);
    const directors = extractPeopleIds(directorsArr);
    const writers = extractPeopleIds(writersArr);

    // Split genres into string
    let genre;
    if (typeof genreString === "string") {
      genre = splitGenres(genreString);
    } else {
      genre = genreString;
    }

    // Build movie object
    const movieData = {
      title,
      releaseYear,
      genre,
      runtime,
      plot,
      rating,
      country,
      image,
      actors,
      directors,
      writers,
    };

    if (action == "create") await dispatch(createMovie(movieData, history));
    else if (action == "update")
      await dispatch(updateMovie(movieId, movieData, history));
  };

  return (
    <Fragment>
      {error.length > 0 && (
        <div className="row">
          <div className="col text-white">
            <div className="form-group bg-danger p-2">{error}</div>
          </div>
        </div>
      )}

      <form id="add-actor-form" onSubmit={onSubmit}>
        <div className="row">
          {showSearchTitle ? (
            <>
              <div className="col">
                <div className="form-group">
                  <label htmlFor="title">Title</label>

                  <input
                    className="form-control app-input"
                    type="text"
                    name="title"
                    value={title}
                    onChange={onChange}
                    required
                  />
                  {!showMovieNotFound && (
                    <small className="form-text text-muted">
                      You can type in the name of a movie and press search to
                      find and autofill the form
                    </small>
                  )}
                  {showMovieNotFound && (
                    <small className="form-text text-danger">
                      Could not find this movie
                    </small>
                  )}
                </div>
              </div>
              <div className="col-auto mt-4">
                <button
                  className="btn btn-secondary"
                  onClick={() => handleSearchMovie(title)}
                  type="button"
                >
                  <i className="fas fa-search"></i>
                </button>
              </div>
            </>
          ) : (
            <div className="col">
              <div className="form-group">
                <label htmlFor="title">Title</label>

                <input
                  className="form-control app-input"
                  type="text"
                  name="title"
                  value={title}
                  onChange={onChange}
                  required
                />
              </div>
            </div>
          )}
        </div>

        <div className="row">
          <div className="col-6">
            <div className="form-group">
              <label htmlFor="releaseYear">Release Year</label>
              <input
                className="form-control app-input"
                type="text"
                name="releaseYear"
                value={releaseYear}
                onChange={onChange}
                required
              />
            </div>
          </div>

          <div className="col-6">
            <div className="form-group">
              <label htmlFor="runtime">Run Time</label>
              <input
                className="form-control app-input"
                type="text"
                name="runtime"
                value={runtime}
                onChange={onChange}
              />
            </div>
          </div>

          <div className="col-6">
            <div className="form-group">
              <label htmlFor="rating">Rating</label>
              <input
                className="form-control app-input"
                type="text"
                name="rating"
                value={rating}
                onChange={onChange}
              />
            </div>
          </div>

          <div className="col-6">
            <div className="form-group">
              <label htmlFor="country">Country</label>
              <input
                className="form-control app-input"
                type="text"
                name="country"
                value={country}
                onChange={onChange}
              />
            </div>
          </div>

          <div className="col-12">
            <div className="form-group">
              <label htmlFor="image">Image URL</label>
              <input
                className="form-control app-input"
                type="text"
                name="image"
                value={image}
                onChange={onChange}
              />
            </div>
          </div>

          <div className="col-12">
            <div className="form-group">
              <label htmlFor="genre">Genres</label>
              <input
                className="form-control app-input"
                type="text"
                name="genre"
                value={genre}
                onChange={onChange}
              />
              <small className="form-text text-muted">
                Enter the genres seperated by commas (e.g. adventure, action,
                fiction)
              </small>
            </div>
          </div>

          <div className="col-12">
            <div className="form-group">
              <label htmlFor="plot">Plot</label>
              <textarea
                className="form-control app-input"
                id="plot"
                rows={3}
                name="plot"
                value={plot}
                onChange={onChange}
              ></textarea>
            </div>
          </div>
        </div>

        <hr />
        <h5>Cast Information</h5>

        <h6>Directors</h6>

        <div className="row">
          <div className="col mb-1">
            {directors.map((director) => (
              <span
                key={director._id}
                className="badge badge-pill badge-secondary p-2 m-1"
                style={{ cursor: "pointer" }}
                onClick={() => removePerson("directors", director._id)}
              >
                {director.firstname} {director.lastname}{" "}
                <i className="fas fa-times-circle"></i>
              </span>
            ))}
          </div>
        </div>

        <div className="row">
          <div className="col">
            <div className="form-group">
              <input
                className="form-control app-input"
                type="text"
                name="director-search"
                value={searchPersonText.directors}
                onChange={(e) => {
                  setSearchPersonText({
                    ...searchPersonText,
                    directors: e.target.value,
                  });
                  searchPerson("directors", e.target.value);
                }}
              />
              <small className="form-text text-muted">
                Type in director's name to search
              </small>
            </div>
          </div>
        </div>

        {searchPersonText.directors.length >= 3 && (
          <div className="row">
            <div className="col">
              <div className="card card-body pb-0">
                {choosePerson.directors.length <= 0 && (
                  <h6>No diector found with this name</h6>
                )}
                {choosePerson.directors.map((chooseDirector) => (
                  <Fragment key={chooseDirector._id}>
                    <h6
                      style={{ cursor: "pointer" }}
                      onClick={() => addPerson("directors", chooseDirector)}
                    >
                      {chooseDirector.firstname} {chooseDirector.lastname}
                    </h6>
                  </Fragment>
                ))}
              </div>
            </div>
          </div>
        )}

        <h6>Actors</h6>

        <div className="row">
          <div className="col mb-1">
            {actors.map((actor) => (
              <span
                key={actor._id}
                className="badge badge-pill badge-secondary p-2 m-1"
                style={{ cursor: "pointer" }}
                onClick={() => removePerson("actors", actor._id)}
              >
                {actor.firstname} {actor.lastname}{" "}
                <i className="fas fa-times-circle"></i>
              </span>
            ))}
          </div>
        </div>

        <div className="row">
          <div className="col">
            <div className="form-group">
              <input
                className="form-control app-input"
                type="text"
                name="actor-search"
                value={searchPersonText.actors}
                onChange={(e) => {
                  setSearchPersonText({
                    ...searchPersonText,
                    actors: e.target.value,
                  });
                  searchPerson("actors", e.target.value);
                }}
              />
              <small className="form-text text-muted">
                Type in actors's name to search
              </small>
            </div>
          </div>
        </div>

        {searchPersonText.actors.length >= 3 && (
          <div className="row">
            <div className="col">
              <div className="card card-body pb-0">
                {choosePerson.actors.length <= 0 && (
                  <h6>No actor found with this name</h6>
                )}
                {choosePerson.actors.map((chooseActor) => (
                  <Fragment key={chooseActor._id}>
                    <h6
                      style={{ cursor: "pointer" }}
                      onClick={() => addPerson("actors", chooseActor)}
                    >
                      {chooseActor.firstname} {chooseActor.lastname}
                    </h6>
                  </Fragment>
                ))}
              </div>
            </div>
          </div>
        )}

        <h6>Writers</h6>

        <div className="row">
          <div className="col mb-1">
            {writers.map((writer) => (
              <span
                key={writer._id}
                className="badge badge-pill badge-secondary p-2 m-1"
                style={{ cursor: "pointer" }}
                onClick={() => removePerson("writers", writer._id)}
              >
                {writer.firstname} {writer.lastname}{" "}
                <i className="fas fa-times-circle"></i>
              </span>
            ))}
          </div>
        </div>

        <div className="row">
          <div className="col">
            <div className="form-group">
              <input
                className="form-control app-input"
                type="text"
                name="writer-search"
                value={searchPersonText.writers}
                onChange={(e) => {
                  setSearchPersonText({
                    ...searchPersonText,
                    writers: e.target.value,
                  });
                  searchPerson("writers", e.target.value);
                }}
              />
              <small className="form-text text-muted">
                Type in writer's name to search
              </small>
            </div>
          </div>
        </div>

        {searchPersonText.writers.length >= 3 && (
          <div className="row">
            <div className="col">
              <div className="card card-body pb-0">
                {choosePerson.writers.length <= 0 && (
                  <h6>No writer found with this name</h6>
                )}
                {choosePerson.writers.map((chooseWriter) => (
                  <Fragment key={chooseWriter._id}>
                    <h6
                      style={{ cursor: "pointer" }}
                      onClick={() => addPerson("writers", chooseWriter)}
                    >
                      {chooseWriter.firstname} {chooseWriter.lastname}
                    </h6>
                  </Fragment>
                ))}
              </div>
            </div>
          </div>
        )}

        <hr />

        <div className="row">
          <div className="col">
            <input
              type="submit"
              className="btn btn-primary btn-block"
              value="Submit"
            />
          </div>
        </div>
      </form>
    </Fragment>
  );
};

export default AddMovieForm;
