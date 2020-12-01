import axios from "axios";

import { setAuthHeader } from "../app_helpers";

import {
  SET_CURRENT_USER,
  REMOVE_CURRENT_USER,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  AUTH_LOADING,
  LOGOUT_SUCCESS,
} from "./index";

/**
 * @description Login a user
 */
export const login = (userData) => async (dispatch) => {
  try {
    await dispatch({ type: AUTH_LOADING });

    // Api call to login user
    const response = await axios.post("auth/login", userData);

    // Set auth header (i.e. x-auth)
    await setAuthHeader(response.data.token);

    await dispatch({
      type: LOGIN_SUCCESS,
      payload: response.data,
    });

    // Set current user
    await dispatch(setCurrentUser());
  } catch (error) {
    console.log(error);

    //   dispatch({
    //     type: GET_ERRORS,
    //     payload: error.response.data,
    //   });

    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

/**
 * @description Register a user
 */
export const register = (newUser) => async (dispatch) => {
  try {
    await dispatch({ type: AUTH_LOADING });

    // Api call to register new user
    const response = await axios.post("auth/register", newUser);

    await dispatch({
      type: REGISTER_SUCCESS,
      payload: response.data,
    });

    // Set auth header (i.e. x-auth-token)
    await setAuthHeader(response.data.token);

    // Set current user
    await dispatch(setCurrentUser());
  } catch (error) {
    console.log(error);

    // dispatch({
    //   type: GET_ERRORS,
    //   payload: error.response.data,
    // });

    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

/**
 * @description Set logged in user
 */
export const setCurrentUser = () => async (dispatch) => {
  try {
    await dispatch({ type: AUTH_LOADING });

    // Get logged in user
    const response = await axios.get("users/profile");

    // Set logged in user
    await dispatch({ type: SET_CURRENT_USER, payload: response.data });

    // Set current profile
    //   await dispatch({ type: GET_CURRENT_PROFILE, payload: response.data });
  } catch (error) {
    console.log(error);

    dispatch({
      type: REMOVE_CURRENT_USER,
    });
  }
};
