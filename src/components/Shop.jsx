import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import products from '../data/products.json';

const Shop = () => {
  console.log('Rendering Shop component');
  const { addToCart } = useContext(CartContext);

  return (
    <div style={{ padding: '80px 20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ fontSize: '24px', marginBottom: '20px' }}>Shop Perfumes</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
        {products.map(product => (
          <div key={product.id} style={{ border: '1px solid #ddd', borderRadius: '10px', overflow: 'hidden', textAlign: 'center', padding: '10px' }}>
            <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: '#000' }}>
              <img
                src={product.image}
                alt={product.name}
                style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/250x200?text=Image+Not+Found';
                }}
              />
              <h3 style={{ fontSize: '18px', margin: '10px 0' }}>{product.name}</h3>
            </Link>
            <p style={{ fontSize: '14px', color: '#555' }}>{product.brand}</p>
            <p style={{ fontSize: '16px', fontWeight: 'bold', margin: '10px 0' }}>
              ₦{product.price.toLocaleString()}
            </p>
            <button
              onClick={() => {
                addToCart(product);
                alert(`${product.name} added to cart!`);
              }}
              style={{ backgroundColor: '#000', color: '#fff', padding: '8px 16px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;