import React from "react";

const ReviewedStars = ({ value, size = "" }) => {
  let sz = size.length > 0 ? `fa-${size}` : "";
  let stars = [];
  for (let i = 1; i <= 10; i++) {
    stars.push(
      <i
        key={i}
        className={`fas fa-star ${sz} review-star${
          i <= value ? "-active" : ""
        }`}
        data-value={i}
      ></i>
    );
  }
  return <span>{stars}</span>;
};

export default ReviewedStars;
