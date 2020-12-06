import React, { Fragment, useEffect } from "react";
import { getUserReviews } from "../../app_actions/reviews";
import { useDispatch, useSelector } from "react-redux";
import ReviewItem from "./ReviewItem";
import ReviewModal from "./ReviewModal";

const UserReviews = ({ _user }) => {
  const { userReviews, loading } = useSelector((state) => state.reviews);
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch user reviews
    dispatch(getUserReviews(_user));
    return () => {};
  }, [_user]);

  if (loading) return <h3>Loading...</h3>;

  if (!loading && userReviews.length === 0)
    return (
      <Fragment>
        <h6>No reviews to display</h6>
      </Fragment>
    );
  return (
    <Fragment>
      <div className="row">
        <div className="col">
          {userReviews.map((review) => (
            <ReviewItem key={review._id} review={review} />
          ))}
        </div>
      </div>
      <ReviewModal></ReviewModal>
    </Fragment>
  );
};

export default UserReviews;
