import React, { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext'; // To get the current user
import products from '../data/products.json';
import RatingStar from './RatingStar';

const ProductView = () => {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const { user } = useContext(AuthContext); // Get the current user
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const [newReview, setNewReview] = useState('');
  const [newRating, setNewRating] = useState(0); // For the user's rating input
  const [userReviews, setUserReviews] = useState([]); // Store user-submitted reviews

  const product = products.find(p => p.id === parseInt(id));

  // Load user-submitted reviews from localStorage when the component mounts
  useEffect(() => {
    const storedReviews = JSON.parse(localStorage.getItem(`product_${id}_reviews`) || '[]');
    setUserReviews(storedReviews);
  }, [id]);

  if (!product) {
    return (
      <div style={{ padding: '80px 20px', fontFamily: 'Arial, sans-serif', textAlign: 'center' }}>
        <h1 style={{ fontSize: '24px', marginBottom: '20px' }}>Product Not Found</h1>
        <button
          onClick={() => navigate('/shop')}
          style={{ backgroundColor: '#000', color: '#fff', padding: '10px 20px', border: 'none', cursor: 'pointer' }}
        >
          Back to Shop
        </button>
      </div>
    );
  }

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!user) {
      alert('Please log in to submit a review.');
      navigate('/login');
      return;
    }
    if (newRating === 0) {
      alert('Please select a rating.');
      return;
    }
    if (!newReview.trim()) {
      alert('Please enter a comment.');
      return;
    }

    const review = {
      user: user.username,
      rating: newRating,
      comment: newReview,
      timestamp: new Date().toISOString(),
    };

    const updatedReviews = [...userReviews, review];
    setUserReviews(updatedReviews);
    localStorage.setItem(`product_${id}_reviews`, JSON.stringify(updatedReviews));
    setNewReview('');
    setNewRating(0);
    alert('Review submitted successfully!');
  };

  const handleStarClick = (rating) => {
    setNewRating(rating);
  };

  // Combine static reviews from products.json with user-submitted reviews
  const allReviews = [...product.reviews, ...userReviews].sort((a, b) => {
    const dateA = a.timestamp ? new Date(a.timestamp) : new Date(0);
    const dateB = b.timestamp ? new Date(b.timestamp) : new Date(0);
    return dateB - dateA; // Sort by timestamp, newest first
  });

  return (
    <div style={{ padding: '80px 20px', fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        <div style={{ flex: '1', minWidth: '300px' }}>
          <img
            src={selectedImage || product.image}
            alt={product.name}
            style={{ width: '100%', height: '400px', objectFit: 'cover', borderRadius: '10px' }}
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/400x400?text=Image+Not+Found';
            }}
          />
          <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
            {product.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`${product.name} ${index + 1}`}
                style={{
                  width: '80px',
                  height: '80px',
                  objectFit: 'cover',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  border: selectedImage === img ? '2px solid #000' : 'none',
                }}
                onClick={() => setSelectedImage(img)}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/80x80?text=Image+Not+Found';
                }}
              />
            ))}
          </div>
        </div>
        <div style={{ flex: '1', minWidth: '300px' }}>
          <h1 style={{ fontSize: '24px', marginBottom: '10px' }}>{product.name}</h1>
          <p style={{ fontSize: '16px', color: '#555', marginBottom: '10px' }}>{product.brand}</p>
          <p style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '20px' }}>
            ₦{product.price.toLocaleString()}
          </p>
          <p style={{ marginBottom: '20px' }}>{product.description}</p>
          <div style={{ marginBottom: '20px' }}>
            <RatingStar rating={product.rating} />
          </div>
          <button
            onClick={() => {
              addToCart(product);
              alert(`${product.name} added to cart!`);
            }}
            style={{ backgroundColor: '#000', color: '#fff', padding: '10px 20px', border: 'none', cursor: 'pointer', marginRight: '10px' }}
          >
            Add to Cart
          </button>
          <button
            onClick={() => navigate('/shop')}
            style={{ backgroundColor: '#555', color: '#fff', padding: '10px 20px', border: 'none', cursor: 'pointer' }}
          >
            Back to Shop
          </button>
        </div>
      </div>

      {/* Reviews Section - Moved to Bottom */}
      <div style={{ marginTop: '40px' }}>
        <h2 style={{ fontSize: '20px', marginBottom: '20px' }}>Reviews</h2>
        {allReviews.length > 0 ? (
          <ul style={{ listStyle: 'none', padding: '0', marginBottom: '40px' }}>
            {allReviews.map((review, index) => (
              <li
                key={index}
                style={{
                  marginBottom: '15px',
                  padding: '15px',
                  border: '1px solid #ddd',
                  borderRadius: '5px',
                  backgroundColor: '#f9f9f9',
                }}
              >
                <p style={{ margin: '0', fontWeight: 'bold' }}>{review.user}</p>
                <div style={{ margin: '5px 0' }}>
                  <RatingStar rating={review.rating} />
                </div>
                <p style={{ margin: '5px 0 0 0' }}>{review.comment}</p>
                {review.timestamp && (
                  <p style={{ fontSize: '12px', color: '#777', marginTop: '5px' }}>
                    Posted on: {new Date(review.timestamp).toLocaleString()}
                  </p>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p style={{ marginBottom: '40px' }}>No reviews yet. Be the first to review this product!</p>
        )}

        {/* Review Submission Form */}
        <div>
          <h3 style={{ fontSize: '18px', marginBottom: '15px' }}>Write a Review</h3>
          <form onSubmit={handleReviewSubmit}>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>Your Rating:</label>
              <div style={{ display: 'inline-flex', alignItems: 'center' }}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    onClick={() => handleStarClick(star)}
                    style={{
                      color: newRating >= star ? '#FFD700' : '#ccc',
                      fontSize: '20px',
                      cursor: 'pointer',
                      marginRight: '5px',
                    }}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>Your Review:</label>
              <textarea
                value={newReview}
                onChange={(e) => setNewReview(e.target.value)}
                placeholder="Write your review here..."
                style={{
                  width: '100%',
                  minHeight: '100px',
                  padding: '10px',
                  borderRadius: '5px',
                  border: '1px solid #ddd',
                  fontFamily: 'Arial, sans-serif',
                  resize: 'vertical',
                }}
              />
            </div>
            <button
              type="submit"
              style={{
                backgroundColor: '#000',
                color: '#fff',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              Submit Review
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductView;