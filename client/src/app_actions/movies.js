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
export const getMovies = (skip, limit) => async (dispatch) => {
  try {
    dispatch({ type: MOVIES_LOADING });

    const response = await axios.get(`/movies?skip=${skip}&limit=${limit}`);

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
 * @description Get movies based on popularity
 */
export const getPopularMovies = () => async (dispatch) => {
  try {
    dispatch({ type: MOVIES_LOADING });

    const response = await axios.get(`/movies/popular`);
    console.log(response.data);
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
