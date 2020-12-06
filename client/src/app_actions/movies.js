import axios from "axios";

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
  CREATE_MOVIE_SUCCESS,
  CREATE_MOVIE_FAIL,
  SEARCH_MOVIES,
} from "./index";

/**
 * @description Fetch a given movie
 */
export const getMovie = (id) => async (dispatch) => {
  try {
    dispatch({ type: MOVIES_LOADING });
    const response = await axios.get(`/movies/${id}`);

    dispatch({
      type: GET_MOVIE,
      payload: response.data,
    });
  } catch (error) {
    console.log(error);

    dispatch({
      type: GET_MOVIES_ERROR,
      payload: error.response.data.message,
    });
  }
};

/**
 * @description Get movies
 */
export const getMovies = ({ skip = 0, limit = 20, queryParams = "" }) => async (
  dispatch
) => {
  try {
    dispatch({ type: MOVIES_LOADING });

    const response = await axios.get(
      `/movies?skip=${skip}&limit=${limit}&${queryParams}`
    );

    dispatch({
      type: GET_MOVIES,
      payload: response.data,
      skip,
    });
  } catch (error) {
    console.log(error);

    //   dispatch({
    //     type: GET_ERRORS,
    //     payload: error.response.data
    //   });
  }
};

/**
 * @description Search Movies by name
 */
export const searchMovies = (title) => async (dispatch) => {
  try {
    // dispatch({ type: MOVIES_LOADING });

    const response = await axios.get(`/movies?title=${title}&limit=${10}`);

    dispatch({
      type: SEARCH_MOVIES,
      payload: response.data,
    });
  } catch (error) {
    console.log(error);

    //   dispatch({
    //     type: GET_ERRORS,
    //     payload: error.response.data
    //   });
  }
};

/**
 * @description Get movies based on popularity
 */
export const getPopularMovies = () => async (dispatch) => {
  try {
    dispatch({ type: MOVIES_LOADING });

    const response = await axios.get(`/movies/popular`);

    dispatch({
      type: GET_POPULAR_MOVIES,
      payload: response.data,
    });
  } catch (error) {
    console.log(error);

    //   dispatch({
    //     type: GET_ERRORS,
    //     payload: error.response.data
    //   });
  }
};

// == POST ACTIONS

/**
 * @description Create a movie
 */
export const createMovie = (movieData, history) => async (dispatch) => {
  try {
    dispatch({ type: MOVIES_LOADING });

    // API call to create a movie
    const response = await axios.post("/movies", movieData);

    dispatch({ type: CREATE_MOVIE_SUCCESS, payload: response.data });

    history.push(`/movies/${response.data.movie._id}`);
  } catch (error) {
    console.log(error);

    dispatch({
      type: CREATE_MOVIE_FAIL,
      payload: error.response.data.message,
    });
  }
};

// == PUT ACTIONS

/**
 * @description Update a movie
 */
export const updateMovie = (_id, movieData, history) => async (dispatch) => {
  try {
    dispatch({ type: MOVIES_LOADING });

    // API call to update a movie
    const response = await axios.patch(`/movies/${_id}`, movieData);

    dispatch({ type: UPDATE_MOVIE_SUCCESS, payload: response.data });

    history.push(`/movies/${response.data.movie._id}`);
  } catch (error) {
    console.log(error);

    dispatch({
      type: UPDATE_MOVIE_FAIL,
      payload: error.response.data.message,
    });
  }
};
