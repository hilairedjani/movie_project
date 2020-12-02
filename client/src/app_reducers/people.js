import {
  GET_PERSON,
  GET_PEOPLE,
  CREATE_PERSON_FAIL,
  CREATE_PERSON_SUCCESS,
  PEOPLE_LOADING,
  FOLLOW_PERSON_SUCCESS,
  FOLLOW_PERSON_FAIL,
  GET_PEOPLE_ERROR,
  UNFOLLOW_PERSON_SUCCESS,
  UNFOLLOW_PERSON_FAIL,
} from "../app_actions";

let initialState = {
  person: null,
  people: [],
  loadMore: false,
  success: false,
  loading: false,
  message: "",
  error: "",
};

const peopleReducer = (state = initialState, { type, payload, skip = 0 }) => {
  switch (type) {
    case GET_PERSON:
      return {
        ...state,
        loading: false,
        message: "",
        person: payload,
        success: true,
        error: "",
      };

    case GET_PEOPLE:
      return {
        ...state,
        loading: false,
        message: "",
        people:
          skip === 0
            ? payload
            : state.people
                .filter(
                  (person) =>
                    !payload.some((newPerson) => newPerson._id === person._id)
                )
                .concat(payload),
        loadMore: payload.length > 0 ? true : false,
      };

    case CREATE_PERSON_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        message: payload.message,
        person: payload.person,
        error: "",
      };

    case CREATE_PERSON_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
        message: "",
        error: payload,
      };

    case FOLLOW_PERSON_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        message: payload.message,
        error: "",
      };

    case FOLLOW_PERSON_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
        message: "",
        error: payload,
      };

    case UNFOLLOW_PERSON_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        message: payload.message,
        error: "",
      };

    case UNFOLLOW_PERSON_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
        message: "",
        error: payload,
      };

    case GET_PEOPLE_ERROR:
      return {
        ...state,
        success: false,
        message: "",
        loading: false,
        error: payload,
      };

    case PEOPLE_LOADING:
      return {
        ...state,
        loading: true,
        message: "",
      };
    default:
      return { ...state };
  }
};

export default peopleReducer;
