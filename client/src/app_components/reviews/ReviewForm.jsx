import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { createReview } from "../../app_actions/reviews";
import ReviewStars from "./ReviewStars";

const initialState = {
  value: 0,
  briefSummary: "",
  fullText: "",
};

const ReviewForm = () => {
  const [formData, setFormData] = useState(initialState);
  const { movie } = useSelector((state) => state.movies);

  const { value, briefSummary, fullText } = formData;

  let stars = [];

  const handleMouseLeave = (e) => {
    //   TODO::Handle later
    // const children = e.target.parentNode.children;
    // for (let i = 0; i < children.length; i++) {
    //   if (children[i].nodeType === 3) continue; // text node
    //   children[i].classList.remove("review-star-active");
    // }
  };

  const handleMouseOver = (e) => {
    // TODO::Handle later
    // e.target.classList.add("review-star-active");
    // // Add class to previous siblings too
    // let curr = e.target;
    // while ((curr = curr.previousSibling)) {
    //   if (curr.nodeType === 3) continue;
    //   curr.classList.add("review-star-active");
    // }
  };

  const handleReviewStarClick = (e) => {
    const value = parseInt(e.target.dataset["value"]);
    setFormData({ ...formData, value });

    //  Add gold class accordingly
    const children = e.target.parentNode.children;

    for (let i = 0; i < children.length; i++) {
      if (children[i].nodeType === 3) continue; // text node
      if (parseInt(children[i].dataset["value"]) > value)
        children[i].classList.remove("review-star-active");
      else children[i].classList.add("review-star-active");
    }
  };

  for (let i = 1; i <= 10; i++) {
    stars.push(
      <i
        key={i}
        className="fas fa-star fa-2x p-1  review-star"
        data-value={i}
        onMouseOver={handleMouseOver}
        onMouseLeave={handleMouseLeave}
        onClick={handleReviewStarClick}
      ></i>
    );
  }

  const dispatch = useDispatch();

  const onChange = (event) =>
    setFormData({ ...formData, [event.target.name]: event.target.value });

  const onSubmit = async (event) => {
    event.preventDefault();

    const { value, briefSummary, fullText } = formData;

    // Build review object
    const reviewData = { value, briefSummary, fullText };
    await dispatch(createReview(movie._id, reviewData));
  };
  return (
    <Fragment>
      <form className="text-muted" onSubmit={onSubmit} id="review-form">
        <div className="row">
          <div className="col-12 text-center pb-2">{stars}</div>
          <div className="col-12">
            <div className="form-group">
              <label htmlFor="briefSummary">Brief summary</label>
              <input
                className="form-control app-input"
                type="text"
                name="briefSummary"
                value={briefSummary}
                onChange={onChange}
                required
              />
            </div>
          </div>

          <div className="col-12">
            <div className="form-group">
              <label htmlFor="fullText">Full Text</label>
              <textarea
                className="form-control app-input"
                id="fullText"
                rows={3}
                name="fullText"
                value={fullText}
                onChange={onChange}
              ></textarea>
            </div>
          </div>
        </div>

        <input
          type="submit"
          className="btn btn-primary float-right"
          value="Submit"
          data-dismiss="modal"
          onClick={onSubmit}
        />
      </form>
    </Fragment>
  );
};

export default ReviewForm;
