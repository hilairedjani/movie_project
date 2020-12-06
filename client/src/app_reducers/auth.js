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
} from "../app_actions";

import { setStorageItem, removeStorageItem } from "../app_helpers";

const initialState = {
  token: localStorage.getItem("x-auth-token"),
  isAuthenticated: null,
  loading: false,
  success: false,
  message: "",
  user: null,
  error: "",
};

const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: true,
        success: true,
        loading: false,
        message: "",
        user: payload,
      };

    case REMOVE_CURRENT_USER:
      localStorage.removeItem("x-auth-token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        message: "",
        success: true,
        user: null,
      };

    case REGISTER_SUCCESS:
      localStorage.setItem("x-auth-token", payload.token);
      return {
        ...state,
        ...payload,
        success: true,
        isAuthenticated: true,
        loading: false,
        error: "",
        message: "You have been registered successfully.",
      };

    case LOGIN_SUCCESS:
      localStorage.setItem("x-auth-token", payload.token);
      return {
        ...state,
        ...payload,
        success: true,
        isAuthenticated: true,
        error: "",
        loading: false,
        message: "You are now logged in.",
      };

    case REGISTER_FAIL:
    case LOGIN_FAIL:
      localStorage.removeItem("x-auth-token");
      return {
        ...state,
        user: null,
        token: null,
        success: false,
        isAuthenticated: false,
        loading: false,
        message: "",
        error: payload,
      };

    case LOGOUT_SUCCESS:
      localStorage.removeItem("x-auth-token");
      return {
        ...state,
        token: null,
        user: null,
        success: true,
        isAuthenticated: false,
        loading: false,
        message: "You are now logged out.",
      };

    case GET_ERROR:
      return {
        ...state,
        error: payload,
      };

    case AUTH_LOADING:
      return {
        ...state,
        loading: true,
        message: "",
      };
    default:
      return state;
  }
};

export default authReducer;
