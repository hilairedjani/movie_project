import React, { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import AddMovieForm from "./AddMovieForm";

const EditMovie = () => {
  const { _id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    return () => {};
  }, []);
  return (
    <div className="row">
      <div className="col-lg-6 offset-lg-3">
        <div className="row">
          <div className="col-12">
            <h2>Edit Movie</h2>
          </div>

          <div className="col-12">
            <div className="card card-body">
              <AddMovieForm
                movieId={_id}
                showSearchTitle={false}
                action="update"
              ></AddMovieForm>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditMovie;
