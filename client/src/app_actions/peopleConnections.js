import axios from "axios";

import {
  GET_PEOPLE_CONNECTIONS,
  PEOPLE_CONNECTIONS_LOADING,
  FOLLOW_PERSON_SUCCESS,
  FOLLOW_PERSON_FAIL,
  UNFOLLOW_PERSON_SUCCESS,
  UNFOLLOW_PERSON_FAIL,
} from "../app_actions";

// == GET ACTIONS

/**
 * @description Get followers
 */
export const getPeopleConnections = (_user) => async (dispatch) => {
  try {
    dispatch({ type: PEOPLE_CONNECTIONS_LOADING });

    // API call to get people user is following
    const response = await axios.get(`/peopleConnections/_user/${_user}`);

    dispatch({ type: GET_PEOPLE_CONNECTIONS, payload: response.data });
  } catch (error) {
    console.log(error);

    // TODO::HANDLE ERRORS
  }
};

// == POST REQUESTS

/**
 * @description Follow a given person
 */
export const followPerson = (_person) => async (dispatch) => {
  try {
    // API call to create a person
    const response = await axios.post(`/peopleConnections/_person/${_person}`);

    dispatch({ type: FOLLOW_PERSON_SUCCESS, payload: response.data });
  } catch (error) {
    console.log(error);

    dispatch({
      type: FOLLOW_PERSON_FAIL,
    });
  }
};

//   == DELETE ACTIONS

/**
 * @description Unollow a given person
 */
export const unfollowPerson = (_person) => async (dispatch) => {
  try {
    // API call to create a person
    const response = await axios.delete(
      `/peopleConnections/_person/${_person}`
    );

    dispatch({ type: UNFOLLOW_PERSON_SUCCESS, payload: response.data });
  } catch (error) {
    console.log(error);

    dispatch({
      type: UNFOLLOW_PERSON_FAIL,
    });
  }
};
