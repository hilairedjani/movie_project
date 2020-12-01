import {
  CONTRIBUTIONS_LOADING,
  GET_CONTRIBUTION,
  GET_CONTRIBUTIONS,
  GET_CONTRIBUTIONS_ERROR,
} from "../app_actions";

let initialState = {
  contribution: null,
  contributions: [],
  loading: false,
  loadMore: false,
  error: "",
  success: false,
  message: "",
};

const contributionReducer = (
  state = initialState,
  { type, payload, skip = 0 }
) => {
  switch (type) {
    case GET_CONTRIBUTION:
      return {
        ...state,
        contribution: payload,
        loading: false,
        success: true,
        error: "",
        message: "",
      };

    case GET_CONTRIBUTIONS:
      return {
        ...state,
        loading: false,
        message: "",
        contributions:
          skip === 0
            ? payload
            : state.contributions
                .filter(
                  (contribution) =>
                    !payload.some(
                      (newContribution) =>
                        newContribution._id === contribution._id
                    )
                )
                .concat(payload),
        loadMore: payload.length > 0 ? true : false,
      };

    case GET_CONTRIBUTIONS_ERROR:
      return {
        ...state,
        loading: false,
        success: false,
        message: "",
        error: payload,
      };

    default:
      return { ...state };
  }
};

export default contributionReducer;
