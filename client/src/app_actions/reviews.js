import axios from "axios";

import { CREATE_REVIEW_FAIL, CREATE_REVIEW_SUCCESS, REVIEWS_LOADING } from "./";

// == GET REQUESTS

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
