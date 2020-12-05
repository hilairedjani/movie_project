import { GET_REVIEW } from "../app_actions";

let initialState = {
  review: null,
  loading: false,
  error: "",
  success: false,
  message: "",
};

const reviewsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_REVIEW:
      return {
        ...state,
        review: payload.review,
        loading: false,
        success: true,
        error: "",
        message: "",
      };

    default:
      return { ...state };
  }
};

export default reviewsReducer;
