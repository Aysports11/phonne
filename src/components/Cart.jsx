import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';

const Cart = () => {
  const { cartItems, clearCart } = useContext(CartContext); // Removed addToCart
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const calculateTotal = () => {
    if (!user || !cartItems[user.username] || cartItems[user.username].length === 0) return 0;
    return cartItems[user.username].reduce((total, item) => total + item.price, 0);
  };

  const handlePayWithPaystack = () => {
    try {
      if (!user) {
        alert('Please log in to checkout.');
        navigate('/login');
        return;
      }

      const userCart = cartItems[user.username];
      if (!userCart || userCart.length === 0) {
        alert('Your cart is empty.');
        return;
      }

      const totalAmount = calculateTotal();
      if (totalAmount < 0.50) {
        alert('The total amount must be at least NGN 0.50 for Paystack payments.');
        return;
      }

      const amountInKobo = totalAmount * 100;
      const handler = window.PaystackPop.setup({
        key: 'pk_test_your_public_key_here',
        email: user.username,
        amount: amountInKobo,
        currency: 'NGN',
        ref: `phonne_${Date.now()}`,
        metadata: {
          cart_items: userCart,
          user_id: user.username,
        },
        callback: (response) => {
          if (response.status === 'success') {
            alert('Payment successful!');
            clearCart();
            navigate('/confirmation');
          } else {
            alert('Payment failed. Please try again.');
          }
        },
        onClose: () => {
          alert('Payment window closed. Please complete the payment to proceed.');
        },
      });

      handler.openIframe();
    } catch (err) {
      alert(`An error occurred during payment: ${err.message}`);
    }
  };

  const handleCheckout = () => {
    try {
      if (!user) {
        alert('Please log in to checkout.');
        navigate('/login');
        return;
      }

      const userCart = cartItems[user.username];
      if (!userCart || userCart.length === 0) {
        alert('Your cart is empty.');
        return;
      }

      alert('Checkout successful!');
      const updatedCart = { ...cartItems, [user.username]: [] };
      localStorage.setItem('cartItems', JSON.stringify(updatedCart));
      navigate('/confirmation');
    } catch (err) {
      alert('An error occurred during checkout. Please try again.');
    }
  };

  return (
    <div style={{ padding: '80px 20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ fontSize: '24px', marginBottom: '20px' }}>Your Cart</h1>
      {!user ? (
        <p>Please log in to view your cart.</p>
      ) : (
        <>
          {(!cartItems[user.username] || cartItems[user.username].length === 0) ? (
            <p>Your cart is empty.</p>
          ) : (
            <>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {cartItems[user.username].map((item, index) => (
                  <li key={index} style={{ padding: '10px 0', borderBottom: '1px solid #ddd' }}>
                    {item.name} - ₦{item.price.toLocaleString()}
                  </li>
                ))}
              </ul>
              <p>Total: ₦{calculateTotal().toLocaleString()}</p>
            </>
          )}
          <button
            onClick={handleCheckout}
            style={{ backgroundColor: '#000', color: '#fff', padding: '10px 20px', border: 'none', cursor: 'pointer', marginTop: '20px' }}
          >
            Checkout
          </button>
          <button
            onClick={handlePayWithPaystack}
            style={{ backgroundColor: '#000', color: '#fff', padding: '10px 20px', border: 'none', cursor: 'pointer', marginTop: '10px', marginLeft: '10px' }}
          >
            Pay with Paystack
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;