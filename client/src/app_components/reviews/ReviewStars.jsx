import React from "react";

const ReviewStars = () => {
  let stars = [];

  const handleMouseLeave = (e) => {};

  const handleMouseOver = (e) => {
    console.log(e.target.dataset["value"]);
  };

  for (let i = 1; i <= 10; i++) {
    stars.push(
      <i
        key={i}
        className="fas fa-star fa-2x p-1 review-star"
        data-value={i}
        onMouseOver={handleMouseOver}
        onMouseLeave={handleMouseLeave}
      ></i>
    );
  }

  return <div>{stars}</div>;
};

export default ReviewStars;
