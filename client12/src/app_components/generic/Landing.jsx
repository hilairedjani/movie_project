import React from "react";

import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const Landing = (props) => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <div className="row">
            <div className="col-12">
              <div className="row">
                <div className="col-8">
                  <h1>
                    <i className="fas fa-film"></i>&nbsp;Movies 55
                  </h1>
                </div>
                <div className="col mr-auto mt-auto">
                  <a
                    href="#"
                    className="font-weight-bold"
                    data-toggle="modal"
                    data-target="#register-modal"
                  >
                    REGISTER
                  </a>{" "}
                  |{" "}
                  <a
                    href="#"
                    data-toggle="modal"
                    data-target="#login-modal"
                    className="font-weight-bold"
                  >
                    LOGIN
                  </a>
                </div>
              </div>
              <hr className="text-muted" />
            </div>
          </div>

          <div className="row">
            <div className="col-md-10 offset-md-1">
              <form className="form-inline my-2 my-lg-0 p-0 w-100">
                <div className="row w-100">
                  <div className="col">
                    <input
                      className="form-control mr-sm-2 bg-dark w-100"
                      type="search"
                      placeholder="Find a movie..."
                      aria-label="Search"
                    />
                  </div>
                  <div className="col-2">
                    <button
                      className="btn btn-warning my-2 my-sm-0 font-weight-bold btn-block"
                      type="submit"
                    >
                      Search
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          <div className="row">
            <div className="col-md-10 offset-md-1 py-5">
              <div
                id="top-movies"
                className="carousel slide"
                data-ride="carousel"
              >
                <ol
                  className="carousel-indicators"
                  id="top-movies-carousel-indicators"
                ></ol>

                <div
                  className="carousel-inner"
                  id="top-movies-carousel-inner"
                ></div>
                <a
                  className="carousel-control-prev"
                  href="#top-movies"
                  role="button"
                  data-slide="prev"
                >
                  <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="sr-only">Previous</span>
                </a>
                <a
                  className="carousel-control-next"
                  href="#top-movies"
                  role="button"
                  data-slide="next"
                >
                  <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="sr-only">Next</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="login-modal"
        tabIndex={-1}
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content bg-dark">
            <div className="modal-header">
              <h5 className="modal-title">Login</h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <LoginForm />
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="register-modal"
        tabIndex={-1}
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content bg-dark">
            <div className="modal-header">
              <h5 className="modal-title">Register</h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <RegisterForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
