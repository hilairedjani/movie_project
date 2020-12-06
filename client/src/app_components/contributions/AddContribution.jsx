import React, { Fragment, useState } from "react";
import AddMovieForm from "../movies/AddMovieForm";
import AddPersonForm from "../people/AddPersonForm";

const AddContribution = () => {
  const [showMovieForm, setShowMovieForm] = useState(true);
  const [showPersonForm, setShowPersonForm] = useState(false);

  return (
    <div className="row">
      <div className="col-lg-6 offset-lg-3 col-mg-10 offset-md-1">
        <div className="card card-body">
          <div className="row">
            <div className="col">
              <label htmlFor="contribution-type">
                What kind of contribution do you want to add?
              </label>
              <br />

              <div className="custom-control custom-radio custom-control-inline">
                <input
                  type="radio"
                  id="movie-contribution"
                  name="contribution-type"
                  className="custom-control-input"
                  checked={showMovieForm}
                  onChange={() => {
                    setShowPersonForm(false);
                    setShowMovieForm(true);
                  }}
                />
                <label
                  className="custom-control-label"
                  htmlFor="movie-contribution"
                >
                  Movie
                </label>
              </div>
              <div className="custom-control custom-radio custom-control-inline">
                <input
                  type="radio"
                  id="person-contribution"
                  name="contribution-type"
                  className="custom-control-input"
                  checked={showPersonForm}
                  onChange={() => {
                    setShowMovieForm(false);
                    setShowPersonForm(true);
                  }}
                />
                <label
                  className="custom-control-label"
                  htmlFor="person-contribution"
                >
                  Person
                </label>
              </div>
            </div>
          </div>

          <hr />
          <div className="row">
            <div className="col">
              {showMovieForm && (
                <Fragment>
                  <h4>
                    <i className="fas fa-film"></i> Add a Movie
                  </h4>
                  <AddMovieForm action="create"></AddMovieForm>
                </Fragment>
              )}
              {showPersonForm && (
                <Fragment>
                  <h4>
                    <i className="fas fa-user"></i> Add a Person
                  </h4>
                  <AddPersonForm></AddPersonForm>
                </Fragment>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddContribution;
