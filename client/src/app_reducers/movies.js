import {
  GET_MOVIE,
  GET_MOVIES,
  GET_POPULAR_MOVIES,
  POST_MOVIE_FAIL,
  POST_MOVIE_SUCCESS,
  UPDATE_MOVIE_FAIL,
  UPDATE_MOVIE_SUCCESS,
  MOVIES_LOADING,
  GET_MOVIES_ERROR,
} from "../app_actions";

let initialState = {
  movie: null,
  movies: [],
  popularMovies: [],
  loadMore: false,
  success: false,
  loading: false,
  message: "",
  error: "",
};

const moviesReducer = (state = initialState, { type, payload, skip = 0 }) => {
  switch (type) {
    case GET_MOVIE:
      return {
        ...state,
        loading: false,
        message: "",
        movie: payload,
        success: true,
        error: "",
      };

    case GET_MOVIES:
      return {
        ...state,
        loading: false,
        message: "",
        movies:
          skip === 0
            ? payload
            : state.movies
                .filter(
                  (movie) =>
                    !payload.some((newMovie) => newMovie._id === movie._id)
                )
                .concat(payload),
        loadMore: payload.length > 0 ? true : false,
      };

    case GET_POPULAR_MOVIES:
      return {
        ...state,
        loading: false,
        message: "",
        popularMovies: payload,
      };

    case GET_MOVIES_ERROR:
      return {
        ...state,
        success: false,
        message: "",
        loading: false,
        error: payload,
      };

    case MOVIES_LOADING:
      return {
        ...state,
        loading: true,
        message: "",
      };
    default:
      return { ...state };
  }
};

export default moviesReducer;
