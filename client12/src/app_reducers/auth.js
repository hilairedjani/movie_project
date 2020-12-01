import {
  SET_CURRENT_USER,
  REMOVE_CURRENT_USER,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  AUTH_LOADING,
  LOGOUT_SUCCESS,
} from "../app_actions";

import { setStorageItem, removeStorageItem } from "../app_helpers";

const initialState = {
  isAuthenticated: false,
  loading: false,
  success: false,
  message: "",
  user: null,
};

export default function (state = initialState, { type, payload }) {
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
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        message: "",
        success: true,
        user: null,
      };
    case REGISTER_SUCCESS:
      setStorageItem("x-auth-token", payload.token);
      return {
        ...state,
        user: payload.user,
        success: true,
        isAuthenticated: true,
        loading: false,
        message: "You have been registered successfully.",
      };

    case LOGIN_SUCCESS:
      setStorageItem("x-auth-token", payload.token);
      return {
        ...state,
        user: payload.user,
        success: true,
        isAuthenticated: true,
        loading: false,
        message: "You are now logged in.",
      };

    case REGISTER_FAIL:
    case LOGIN_FAIL:
      removeStorageItem("x-auth-token");
      return {
        ...state,
        user: null,
        success: false,
        isAuthenticated: false,
        loading: false,
        message: "An error occured...",
      };

    case LOGOUT_SUCCESS:
      removeStorageItem("x-auth-token");
      return {
        ...state,
        user: null,
        success: true,
        isAuthenticated: false,
        loading: false,
        message: "You are now logged out.",
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
}
