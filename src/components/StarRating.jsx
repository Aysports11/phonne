import React from 'react';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';

const StarRating = ({ rating, onRatingChange, editable = false }) => {
  const stars = Array(5).fill(0).map((_, i) => {
    const value = i + 1;
    return (
      <FaStar
        key={i}
        style={{
          color: rating >= value ? '#ffd700' : '#e4e5e9',
          cursor: editable ? 'pointer' : 'default',
          fontSize: '20px',
        }}
        onClick={() => editable && onRatingChange(value)}
      />
    );
  });

  return <div style={{ display: 'flex', gap: '5px' }}>{stars}</div>;
};

export default StarRating;