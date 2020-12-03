import React from "react";
import ReviewForm from "./ReviewForm";

const AddReviewModal = () => {
  return (
    <div
      className="modal fade"
      id="add-review-modal"
      tabIndex={-1}
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add a review</h5>
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
            <ReviewForm></ReviewForm>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddReviewModal;
