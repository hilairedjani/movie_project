import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const MovieItem = ({ movie }) => {
  return (
    <Link to={`/movies/${movie._id}`} key={movie._id}>
      <div className="card card-body p-0">
        <img src={movie.image} className="card-img" alt={`${movie.title}`} />

        <div
          style={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            backgroundColor: "rgb(0, 0, 0, 0.75)",
          }}
        >
          <h5 className="text-center text-white py-2">{movie.title}</h5>
        </div>
      </div>
    </Link>
  );
};

export default MovieItem;
