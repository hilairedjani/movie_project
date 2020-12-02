import axios from "axios";

/**
 * @description This method adds x-auth-token header to every api request
 */
export const setAuthHeader = (token) => {
  // Add authentication header to every api request if token is present
  if (token) {
    axios.defaults.headers.common["x-auth-token"] = token;
  } else {
    delete axios.defaults.headers.common["x-auth-token"];
  }
};

/**
 * @description Set default base url for http requests
 */
export const setBaseURL = async (url) => {
  try {
    axios.defaults.baseURL = url;
  } catch (error) {
    console.log(error);
  }
};

export const getStorageItem = async (key) => {
  let value = null;
  try {
    value = await localStorage.getItem(key);
  } catch (error) {
    console.log(error);
  }
  return value;
};

export const setStorageItem = async (key, value) => {
  try {
    await localStorage.setItem(key, value);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const removeStorageItem = async (key) => {
  try {
    await localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const isFollowingPerson = (personId, people) =>
  people.includes(personId);
