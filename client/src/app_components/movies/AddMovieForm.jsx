import React, { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createMovie } from "../../app_actions/movies";

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

const AddMovieForm = () => {
  const [formData, setFormData] = useState(initialState);

  const {
    title,
    releaseYear,
    genre,
    runtime,
    plot,
    rating,
    country,
    image,
  } = formData;

  const dispatch = useDispatch();
  const history = useHistory();

  const onChange = (event) =>
    setFormData({ ...formData, [event.target.name]: event.target.value });

  const onSubmit = async (event) => {
    event.preventDefault();

    const {
      title,
      releaseYear,
      genre,
      runtime,
      plot,
      rating,
      country,
      image,
    } = formData;

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
    };

    await dispatch(createMovie(movieData, history));
  };
  return (
    <Fragment>
      <form id="add-actor-form" onSubmit={onSubmit}>
        <div className="row">
          <div className="col-12">
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

          <div className="col-6">
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
