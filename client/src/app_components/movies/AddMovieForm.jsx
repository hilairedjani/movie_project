import React, { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { createPerson } from "../../app_actions/people";

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
    console.log(movieData);
    // await dispatch(createPerson(movieData));
  };
  return (
    <Fragment>
      <form id="add-actor-form" onSubmit={onSubmit}>
        <div className="row">
          <div className="col-12">
            <div className="form-group">
              <label htmlFor="firstname">Title</label>
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
