import React from 'react';
import { Link } from 'react-router-dom';
import RatingStar from './RatingStar';

const ProductCard = ({ product }) => {
  return (
    <div
      style={{
        border: '1px solid #ddd',
        borderRadius: '10px',
        overflow: 'hidden',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        textAlign: 'center',
        padding: '10px',
      }}
    >
      <Link to={`/product/${product.id}`}>
        <img
          src={product.image}
          alt={product.name}
          style={{ width: '100%', height: '200px', objectFit: 'cover' }}
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/250x200?text=Image+Not+Found';
          }}
        />
      </Link>
      <h3 style={{ fontSize: '18px', margin: '10px 0' }}>{product.name}</h3>
      <p style={{ fontSize: '14px', color: '#555' }}>{product.brand}</p>
      <p style={{ fontSize: '16px', fontWeight: 'bold', margin: '10px 0' }}>
        ₦{product.price.toLocaleString()}
      </p>
      <RatingStar rating={product.rating} />
      {/* Removed the Add to Cart button */}
    </div>
  );
};

export default ProductCard;