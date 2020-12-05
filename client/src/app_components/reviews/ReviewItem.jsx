import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getReview } from "../../app_actions/reviews";

const ReviewItem = ({ review }) => {
  const dispatch = useDispatch();

  let stars = [];

  for (let i = 1; i <= 10; i++) {
    stars.push(
      <i
        key={i}
        className={`fas fa-star review-star${
          i <= review.value ? "-active" : ""
        }`}
        data-value={i}
      ></i>
    );
  }

  const handleReviewItemClick = (e) => {
    dispatch(getReview(review._id));
  };
  return (
    <a href="#" data-toggle="modal" data-target="#review-modal">
      <div className="card card-body p-2" onClick={handleReviewItemClick}>
        <div className="row">
          <div className="col-auto pr-0">
            <i className="fas fa-user-circle fa-3x"></i>
          </div>
          <div className="col px-2">
            <h5 className="mb-1">{review._user.username}</h5>
            {stars}
            <p className="mb-0">{review.briefSummary}</p>
          </div>
        </div>
      </div>
    </a>
  );
};

export default ReviewItem;
