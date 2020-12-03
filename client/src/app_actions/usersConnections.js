import axios from "axios";

import {
  GET_FOLLOWERS,
  GET_FOLLOWING,
  FOLLOW_USER_SUCCESS,
  FOLLOW_USER_FAIL,
  UNFOLLOW_USER_FAIL,
  UNFOLLOW_USER_SUCCESS,
  USERS_CONNECTIONS_LOADING,
} from "../app_actions";

// == GET ACTIONS

/**
 * @description Get followers
 */
export const getFollowers = (_following) => async (dispatch) => {
  try {
    dispatch({ type: USERS_CONNECTIONS_LOADING });

    // API call to get user's followers
    const response = await axios.get(
      `/usersConnections/_following/${_following}`
    );

    dispatch({ type: GET_FOLLOWERS, payload: response.data });
  } catch (error) {
    console.log(error);

    // TODO::HANDLE ERRORS
  }
};

/**
 * @description Get following
 */
export const getFollowings = (_follower) => async (dispatch) => {
  try {
    dispatch({ type: USERS_CONNECTIONS_LOADING });

    // API call to get user's following
    const response = await axios.get(
      `/usersConnections/_follower/${_follower}`
    );

    dispatch({ type: GET_FOLLOWING, payload: response.data });
  } catch (error) {
    console.log(error);

    // TODO::HANDLE ERRORS
  }
};

// == POST ACTIONS

/**
 * @description Follow a given user
 */
export const followUser = (_following) => async (dispatch) => {
  try {
    dispatch({ type: USERS_CONNECTIONS_LOADING });

    // API call to follow a user
    const response = await axios.post(
      `/usersConnections/_following/${_following}`
    );

    dispatch({ type: FOLLOW_USER_SUCCESS, payload: response.data });
  } catch (error) {
    console.log(error);

    dispatch({
      type: FOLLOW_USER_FAIL,
    });
  }
};

// == PUT/PATCH ACTIONS

// == DELETE ACTIONS

/**
 * @description Unfollow a given user
 */
export const unfollowUser = (_following) => async (dispatch) => {
  try {
    dispatch({ type: USERS_CONNECTIONS_LOADING });

    // API call to unfollow a user
    const response = await axios.delete(
      `/usersConnections/_following/${_following}`
    );

    dispatch({ type: UNFOLLOW_USER_SUCCESS, payload: response.data });
  } catch (error) {
    console.log(error);

    dispatch({
      type: UNFOLLOW_USER_FAIL,
    });
  }
};
