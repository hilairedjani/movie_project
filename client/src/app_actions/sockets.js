import { ADD_SOCKET_REF } from ".";

/**
 * @description Add socket ref to storage
 */
export const addSocketRef = (socketRef) => async (dispatch) => {
  try {
    dispatch({
      type: ADD_SOCKET_REF,
      payload: socketRef,
    });
  } catch (error) {
    console.log(error);
  }
};
