import {
  GET_PROFILE,
  GET_CURRENT_PROFILE,
  GET_PROFILES,
  UPDATE_PROFILE_FAIL,
  UPDATE_PROFILE_SUCCESS,
  FOLLOW_PERSON_SUCCESS,
  FOLLOW_USER_SUCCESS,
  GET_PROFILE_ERROR,
  PROFILES_LOADING,
  UNFOLLOW_PERSON_SUCCESS,
} from "../app_actions";

const initialState = {
  profile: null,
  currentProfile: null,
  profiles: [],
  loading: false,
  loadMore: false,
  success: false,
  message: "",
  error: "",
};

const userReducer = (state = initialState, { type, payload, skip = 0 }) => {
  switch (type) {
    case GET_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false,
        success: true,
        message: "",
        error: "",
      };

    case GET_CURRENT_PROFILE:
      return {
        ...state,
        currentProfile: payload,
        loading: false,
        success: true,
        message: "",
        error: "",
      };

    case GET_PROFILES:
      return {
        ...state,
        loading: false,
        message: "",
        profiles:
          skip === 0
            ? payload
            : state.profiles
                .filter(
                  (profile) =>
                    !payload.some(
                      (newProfile) => newProfile._id === profile._id
                    )
                )
                .concat(payload),
        loadMore: payload.length > 0 ? true : false,
      };

    case UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        message: "Profile has been updated",
        profile: { ...state.profile, ...payload.user },
      };

    case UPDATE_PROFILE_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
        message: "Profile could not be updated",
      };

    case FOLLOW_PERSON_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        error: "",
        currentProfile: {
          ...state.currentProfile,
          people: [...state.currentProfile.people, payload.connection._person],
        },
        message: "",
      };

    case UNFOLLOW_PERSON_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
        success: true,
        currentProfile: {
          ...state.currentProfile,
          people: state.currentProfile.people.filter(
            (person) => person !== payload.connection._person
          ),
        },
        message: "",
      };

    case GET_PROFILE_ERROR:
      return {
        ...state,
        success: false,
        message: "",
        loading: false,
        error: payload,
      };

    case PROFILES_LOADING:
      return {
        ...state,
        loading: true,
        message: "",
      };

    default:
      return {
        ...state,
      };
  }
};

export default userReducer;
