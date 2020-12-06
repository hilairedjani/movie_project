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
  GET_ERROR,
} from "./index";

/**
 * @description Login a user
 */
export const login = (userData) => async (dispatch) => {
  try {
    dispatch({ type: AUTH_LOADING });

    // Api call to login user
    const response = await axios.post("/auth/login", userData);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: response.data,
    });

    // Set current user
    await dispatch(setCurrentUser());
  } catch (error) {
    console.log(error.response);

    dispatch({
      type: LOGIN_FAIL,
      payload: error.response.data.message,
    });
  }
};

/**
 * @description Register a user
 */
export const register = (newUser) => async (dispatch) => {
  try {
    dispatch({ type: AUTH_LOADING });

    // Api call to register new user
    const response = await axios.post("/auth/register", newUser);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: response.data,
    });

    // Set current user
    dispatch(setCurrentUser());
  } catch (error) {
    console.log(error);

    dispatch({
      type: REGISTER_FAIL,
      payload: error.response.data.message,
    });
  }
};

/**
 * @description Logout a user
 */
export const logout = () => async (dispatch) => {
  try {
    dispatch({ type: AUTH_LOADING });

    dispatch({
      type: LOGOUT_SUCCESS,
    });
  } catch (error) {
    console.log(error);

    // dispatch({
    //   type: GET_ERRORS,
    //   payload: error.response.data,
    // });
  }
};

/**
 * @description Set logged in user
 */
export const setCurrentUser = () => async (dispatch) => {
  // Set auth header (i.e. x-auth-token)
  const token = localStorage.getItem("x-auth-token");
  if (token) setAuthHeader(token);

  try {
    dispatch({ type: AUTH_LOADING });

    // Get logged in user
    const response = await axios.get("/auth/current");

    // Set logged in user
    dispatch({ type: SET_CURRENT_USER, payload: response.data });
  } catch (error) {
    console.log(error);

    dispatch({
      type: REMOVE_CURRENT_USER,
    });
  }
};
