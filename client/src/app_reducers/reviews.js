import { GET_REVIEW, GET_USER_REVIEWS } from "../app_actions";

let initialState = {
  review: null,
  userReviews: [],
  movieReviews: [],
  loading: false,
  loadMore: false,
  error: "",
  success: false,
  message: "",
};

const reviewsReducer = (state = initialState, { type, payload, skip = 0 }) => {
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

    case GET_USER_REVIEWS:
      return {
        ...state,
        loading: false,
        message: "",
        userReviews:
          skip === 0
            ? payload.reviews
            : state.userReviews
                .filter(
                  (review) =>
                    !payload.reviews.some(
                      (newReview) => newReview._id === review._id
                    )
                )
                .concat(payload.reviews),
        loadMore: payload.reviews.length > 0 ? true : false,
      };

    default:
      return { ...state };
  }
};

export default reviewsReducer;
