import { ADD_SOCKET_REF } from "../app_actions";

let initialState = {
  socketRef: null,
};

const socketsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_SOCKET_REF:
      return {
        ...state,
        socketRef: payload,
      };

    default:
      return { ...state };
  }
};

export default socketsReducer;
