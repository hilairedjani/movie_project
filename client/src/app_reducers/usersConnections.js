import {
  GET_FOLLOWERS,
  GET_FOLLOWING,
  USERS_CONNECTIONS_LOADING,
} from "../app_actions";

let initialState = {
  followers: [],
  followings: [],
  loading: false,
  loadMore: false,
  error: "",
  success: false,
  message: "",
};

const usersConnectionsReducer = (
  state = initialState,
  { type, payload, skip = 0 }
) => {
  switch (type) {
    case GET_FOLLOWERS:
      return {
        ...state,
        loading: false,
        message: "",
        followers:
          skip === 0
            ? payload.followers
            : state.followers
                .filter(
                  (follower) =>
                    !payload.followers.some(
                      (newFollower) => newFollower._id === follower._id
                    )
                )
                .concat(payload),
        loadMoreFollowers: payload.followers.length > 0 ? true : false,
      };

    case GET_FOLLOWING:
      return {
        ...state,
        loading: false,
        message: "",
        followings:
          skip === 0
            ? payload.followings
            : state.followings
                .filter(
                  (following) =>
                    !payload.followings.some(
                      (newFollowing) => newFollowing._id === following._id
                    )
                )
                .concat(payload),
        loadMoreFollowings: payload.followings.length > 0 ? true : false,
      };

    case USERS_CONNECTIONS_LOADING:
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

export default usersConnectionsReducer;
