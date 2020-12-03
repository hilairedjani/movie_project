import {
  GET_PEOPLE_CONNECTIONS,
  FOLLOW_PERSON_FAIL,
  FOLLOW_PERSON_SUCCESS,
  UNFOLLOW_PERSON_FAIL,
  UPDATE_PERSON_SUCCESS,
  PEOPLE_CONNECTIONS_LOADING,
} from "../app_actions";

let initialState = {
  connections: [],
  loading: false,
  loadMore: false,
  error: "",
  success: false,
  message: "",
};

const peopleConnectionsReducer = (
  state = initialState,
  { type, payload, skip = 0 }
) => {
  switch (type) {
    case GET_PEOPLE_CONNECTIONS:
      return {
        ...state,
        loading: false,
        message: "",
        connections:
          skip === 0
            ? payload.connections
            : state.connections
                .filter(
                  (connection) =>
                    !payload.connections.some(
                      (newConnection) => newConnection._id === connection._id
                    )
                )
                .concat(payload),
        loadMore: payload.connections.length > 0 ? true : false,
      };

    case PEOPLE_CONNECTIONS_LOADING:
      return {
        ...state,
        loading: true,
        message: "",
        error: "",
      };

    default:
      return { ...state };
  }
};

export default peopleConnectionsReducer;
