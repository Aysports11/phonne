import React from 'react';
import StarRating from './StarRating';

const Review = ({ review }) => {
  return (
    <div style={{
      borderBottom: '1px solid #ddd',
      padding: '10px 0',
      fontFamily: 'Arial, sans-serif',
    }}>
      <p style={{ fontWeight: 'bold' }}>{review.user}</p>
      <StarRating rating={review.rating} />
      <p>{review.comment}</p>
    </div>
  );
};

export default Review;