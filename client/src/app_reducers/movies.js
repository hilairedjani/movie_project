import {
  GET_MOVIE,
  GET_MOVIES,
  SEARCH_MOVIES,
  GET_POPULAR_MOVIES,
  CREATE_MOVIE_FAIL,
  CREATE_MOVIE_SUCCESS,
  UPDATE_MOVIE_FAIL,
  UPDATE_MOVIE_SUCCESS,
  MOVIES_LOADING,
  GET_MOVIES_ERROR,
  CREATE_REVIEW_SUCCESS,
} from "../app_actions";

let initialState = {
  movie: null,
  movies: [],
  popularMovies: [],
  searchedMovies: [],
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

    case SEARCH_MOVIES:
      return {
        ...state,
        loading: false,
        message: "",
        success: true,
        error: "",
        searchedMovies: payload,
      };

    case GET_POPULAR_MOVIES:
      return {
        ...state,
        loading: false,
        message: "",
        popularMovies: payload,
      };

    case CREATE_MOVIE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        message: payload.message,
        movie: payload.movie,
        error: "",
      };

    case CREATE_MOVIE_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
        message: "",
        error: payload,
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

    case CREATE_REVIEW_SUCCESS:
      let reviews = [...state.movie.reviews];

      if (state.movie._id == payload.review._movie) {
        reviews.unshift(payload.review);
      }

      return {
        ...state,
        loading: false,
        message: "",
        error: "",
        success: false,
        movie: {
          ...state.movie,
          reviews: reviews,
        },
      };
    default:
      return { ...state };
  }
};

export default moviesReducer;
