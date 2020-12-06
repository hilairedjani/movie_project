import axios from "axios";

import {
  CREATE_REVIEW_FAIL,
  CREATE_REVIEW_SUCCESS,
  GET_REVIEW,
  GET_USER_REVIEWS,
  REVIEWS_LOADING,
} from "./";

// == GET REQUESTS

export const getReview = (_id) => async (dispatch) => {
  try {
    // dispatch({ type: REVIEWS_LOADING });

    // API call to get a given review
    const response = await axios.get(`/reviews/${_id}`);

    dispatch({ type: GET_REVIEW, payload: response.data });
  } catch (error) {
    console.log(error);
  }
};

/**
 * @description Get all reviews by a given user
 */
export const getUserReviews = (_user) => async (dispatch) => {
  try {
    // dispatch({ type: REVIEWS_LOADING });

    // API call to get reviews by a user
    const response = await axios.get(`/reviews/user/${_user}`);

    dispatch({ type: GET_USER_REVIEWS, payload: response.data });
  } catch (error) {
    console.log(error);
  }
};

// == POST REQUESTS

/**
 * @description Create a review for a movie
 */
export const createReview = (_movie, reviewData) => async (dispatch) => {
  try {
    dispatch({ type: REVIEWS_LOADING });

    // API call to create a review
    const response = await axios.post(`/reviews/_movie/${_movie}`, reviewData);

    dispatch({ type: CREATE_REVIEW_SUCCESS, payload: response.data });
  } catch (error) {
    console.log(error);

    dispatch({
      type: CREATE_REVIEW_FAIL,
    });
  }
};
