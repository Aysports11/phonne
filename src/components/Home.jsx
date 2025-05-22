import React from 'react';
import ProductCard from '../components/ProductCard';
import products from '../data/products.json';

const Home = () => {
  return (
    <div style={{
      backgroundImage: 'url(https://images.pexels.com/photos/29805437/pexels-photo-29805437/free-photo-of-elegant-black-perfume-bottle-on-a-dark-background.jpeg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      paddingTop: '60px',
      fontFamily: 'Arial, sans-serif',
    }}>
      <div style={{
        textAlign: 'center',
        padding: '20px',
        color: '#fff',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        maxWidth: '600px',
        margin: '0 auto',
        borderRadius: '10px',
      }}>
        <h1 style={{ fontSize: '48px', marginBottom: '20px' }}>Elevate Your Essence</h1>
        <p style={{ fontSize: '18px' }}>Long-Lasting fragrances.</p>
      </div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px',
        padding: '20px',
        maxWidth: '1200px',
        margin: '0 auto',
      }}>
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Home;