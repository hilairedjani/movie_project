import axios from "axios";

import {
  CONTRIBUTIONS_LOADING,
  GET_CONTRIBUTION,
  GET_CONTRIBUTIONS,
  GET_CONTRIBUTIONS_ERROR,
} from "./";

/**
 * @description Fetch a given contribution
 */
export const getContribution = (_id) => async (dispatch) => {
  try {
    dispatch({ type: CONTRIBUTIONS_LOADING });
    const response = await axios.get(`/contributions/${_id}`);

    dispatch({
      type: GET_CONTRIBUTION,
      payload: response.data,
    });
  } catch (error) {
    console.log(error);

    dispatch({
      type: GET_CONTRIBUTIONS_ERROR,
      payload: error.response.data.message,
    });
  }
};

/**
 * @description Get contributions for a given user
 */
export const getUserContributions = (_user, skip = 0, limit = 10) => async (
  dispatch
) => {
  try {
    dispatch({ type: CONTRIBUTIONS_LOADING });

    const response = await axios.get(
      `/contributions/_user/${_user}?skip=${skip}&limit=${limit}`
    );

    dispatch({
      type: GET_CONTRIBUTIONS,
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
