import axios from "axios";

/**
 * @description This method adds x-auth-token header to every api request
 */
export const setAuthHeader = async (token) => {
  // Add authentication header to every api request if token is present
  if (token) {
    axios.defaults.headers.common["x-auth-token"] = token;
  } else {
    delete axios.defaults.headers.common["x-auth-token"];
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
