import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ReviewedStars from "./ReviewedStars";

const ReviewModal = () => {
  const { review, loading } = useSelector((state) => state.reviews);

  useEffect(() => {
    return () => {};
  }, []);
  return (
    <div
      className="modal fade"
      id="review-modal"
      tabIndex={-1}
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Review</h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            {loading && <h3>Loading...</h3>}
            {!loading && review && (
              <>
                <h4>{review._movie.title}</h4>
                {review.briefSummary && <h6>{review.briefSummary}</h6>}
                <ReviewedStars value={review.value} size="lg"></ReviewedStars>
                {review.fullText && (
                  <>
                    <hr />
                    <p>{review.fullText}</p>
                  </>
                )}

                <br />
                <h6 className="float-right text-muted font-weight-bold">
                  by {review._user.username}
                </h6>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;
