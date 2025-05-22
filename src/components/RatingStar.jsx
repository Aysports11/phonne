import React from 'react';

const RatingStar = ({ rating }) => {
  const fullStars = Math.floor(rating); 
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center' }}>
      {/* Full stars */}
      {[...Array(fullStars)].map((_, index) => (
        <span key={`full-${index}`} style={{ color: '#FF8B50', fontSize: '16px' }}>
          ★
        </span>
      ))}
      {/* Half star */}
      {hasHalfStar && (
        <span style={{ color: '#FFDF00', fontSize: '16px' }}>
          ☆ {/* Using an empty star with a filled half effect; can be improved with SVG */}
        </span>
      )}
      {/* Empty stars */}
      {[...Array(emptyStars)].map((_, index) => (
        <span key={`empty-${index}`} style={{ color: '#FFD700', fontSize: '16px' }}>
          ☆
        </span>
      ))}
      <span style={{ marginLeft: '5px', fontSize: '14px', color: '#555' }}>
        ({rating.toFixed(1)})
      </span>
    </div>
  );
};

export default RatingStar;