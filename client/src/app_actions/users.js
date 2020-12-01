import axios from "axios";

import { setAuthHeader } from "../app_helpers";

import {
  GET_PROFILE,
  GET_PROFILES,
  UPDATE_PROFILE_FAIL,
  UPDATE_PROFILE_SUCCESS,
  GET_PROFILE_ERROR,
  PROFILES_LOADING,
} from "../app_actions";

/**
 * @description Fetch a given profile
 */
export const getProfile = (_id) => async (dispatch) => {
  try {
    dispatch({ type: PROFILES_LOADING });
    const response = await axios.get(`/users/${_id}`);

    dispatch({
      type: GET_PROFILE,
      payload: response.data,
    });
  } catch (error) {
    console.log(error);

    dispatch({
      type: GET_PROFILE_ERROR,
      payload: error.response.data.message,
    });
  }
};

/**
 * @description Get profiles
 */
export const getProfiles = (skip, limit) => async (dispatch) => {
  try {
    dispatch({ type: PROFILES_LOADING });

    const response = await axios.get(`/users?skip=${skip}&limit=${limit}`);

    dispatch({
      type: GET_PROFILES,
      payload: response.data,
      skip,
    });
  } catch (error) {
    console.log(error);

    dispatch({
      type: GET_PROFILE_ERROR,
      payload: error.response.data.message,
    });
  }
};

/**
 * @description Update profile
 */
export const updateProfile = (profileData) => async (dispatch) => {
  try {
    dispatch({ type: PROFILES_LOADING });

    const response = await axios.patch(`/users/profile`, profileData);

    dispatch({
      type: UPDATE_PROFILE_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    console.log(error);

    dispatch({
      type: GET_PROFILE_ERROR,
      payload: error.response.data.message,
    });

    dispatch({
      type: UPDATE_PROFILE_FAIL,
    });
  }
};
