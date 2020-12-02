import axios from "axios";

import {
  GET_PERSON,
  GET_PEOPLE,
  CREATE_PERSON_FAIL,
  CREATE_PERSON_SUCCESS,
  PEOPLE_LOADING,
  GET_PEOPLE_ERROR,
  FOLLOW_PERSON_SUCCESS,
  FOLLOW_PERSON_FAIL,
  UNFOLLOW_PERSON_SUCCESS,
  UNFOLLOW_PERSON_FAIL,
} from "./";

/**
 * @description Fetch a given person
 */
export const getPerson = (_id) => async (dispatch) => {
  try {
    dispatch({ type: PEOPLE_LOADING });

    const response = await axios.get(`/people/${_id}`);

    dispatch({
      type: GET_PEOPLE,
      payload: response.data,
    });
  } catch (error) {
    console.log(error);

    dispatch({
      type: GET_PEOPLE_ERROR,
      payload: error.response.data.message,
    });
  }
};

/**
 * @description Get people
 */
export const getPeople = (skip, limit) => async (dispatch) => {
  try {
    dispatch({ type: PEOPLE_LOADING });

    const response = await axios.get(`/people?skip=${skip}&limit=${limit}`);

    dispatch({
      type: GET_PEOPLE,
      payload: response.data,
      skip,
    });
  } catch (error) {
    console.log(error);

    dispatch({
      type: GET_PEOPLE_ERROR,
      payload: error.response.data.message,
    });
  }
};

// == POST METHODS

/**
 * @description Create a person
 */
export const createPerson = (personData, history) => async (dispatch) => {
  try {
    dispatch({ type: PEOPLE_LOADING });

    // API call to create a person
    const response = await axios.post("/people", personData);

    dispatch({ type: CREATE_PERSON_SUCCESS, payload: response.data });

    history.push(`/profile`);
  } catch (error) {
    console.log(error);

    dispatch({
      type: GET_PEOPLE_ERROR,
      payload: error.response.data.message,
    });

    dispatch({
      type: CREATE_PERSON_FAIL,
    });
  }
};

/**
 * @description Follow a given person
 */
export const followPerson = (_user, _person) => async (dispatch) => {
  try {
    // dispatch({ type: PEOPLE_LOADING });

    // API call to create a person
    const response = await axios.post(`/peopleConnections/_person/${_person}`);

    dispatch({ type: FOLLOW_PERSON_SUCCESS, payload: response.data });
  } catch (error) {
    console.log(error);

    dispatch({
      type: GET_PEOPLE_ERROR,
      payload: error.response.data.message,
    });

    dispatch({
      type: FOLLOW_PERSON_FAIL,
    });
  }
};

/**
 * @description Follow a given person
 */
export const unfollowPerson = (_user, _person) => async (dispatch) => {
  try {
    // dispatch({ type: PEOPLE_LOADING });

    // API call to create a person
    const response = await axios.delete(
      `/peopleConnections/_person/${_person}`
    );

    dispatch({ type: UNFOLLOW_PERSON_SUCCESS, payload: response.data });
  } catch (error) {
    console.log(error);

    dispatch({
      type: GET_PEOPLE_ERROR,
      payload: error.response.data.message,
    });

    dispatch({
      type: UNFOLLOW_PERSON_FAIL,
    });
  }
};
