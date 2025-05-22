import React, { useState } from 'react';

const Contact = () => {
  console.log('Rendering Contact component');

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear errors for the field being edited
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    return newErrors;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Simulate form submission (replace with backend API call or localStorage logic)
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' }); // Reset form
    setTimeout(() => setSubmitted(false), 3000); // Hide success message after 3s
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundImage: 'url("https://images.pexels.com/photos/13875783/pexels-photo-13875783.jpeg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        padding: '80px 20px',
        fontFamily: 'Arial, sans-serif',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        color: '#fff',
      }}
    >
      <div
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.85)',
          padding: '40px',
          borderRadius: '10px',
          maxWidth: '600px',
          width: '100%',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
        }}
      >
        <h1 style={{ fontSize: '24px', marginBottom: '20px' }}>Contact Us</h1>
        <p style={{ marginBottom: '10px' }}>Email: support@ayo.com</p>
        <p style={{ marginBottom: '20px' }}>Phone: +234 8107344028</p>
        <p style={{ marginBottom: '30px' }}>
          We’re here to assist you with all your fragrance needs!
        </p>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '5px',
                border: '1px solid #fff',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                color: '#fff',
                fontSize: '16px',
                outline: 'none',
                transition: 'border-color 0.3s ease',
              }}
              onFocus={(e) => (e.target.style.borderColor = '#FFD700')}
              onBlur={(e) => (e.target.style.borderColor = '#fff')}
            />
            {errors.name && (
              <p style={{ color: '#ff4d4d', fontSize: '14px', marginTop: '5px', textAlign: 'left' }}>
                {errors.name}
              </p>
            )}
          </div>

          <div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '5px',
                border: '1px solid #fff',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                color: '#fff',
                fontSize: '16px',
                outline: 'none',
                transition: 'border-color 0.3s ease',
              }}
              onFocus={(e) => (e.target.style.borderColor = '#FFD700')}
              onBlur={(e) => (e.target.style.borderColor = '#fff')}
            />
            {errors.email && (
              <p style={{ color: '#ff4d4d', fontSize: '14px', marginTop: '5px', textAlign: 'left' }}>
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Subject (e.g., Product Inquiry)"
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '5px',
                border: '1px solid #fff',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                color: '#fff',
                fontSize: '16px',
                outline: 'none',
                transition: 'border-color 0.3s ease',
              }}
              onFocus={(e) => (e.target.style.borderColor = '#FFD700')}
              onBlur={(e) => (e.target.style.borderColor = '#fff')}
            />
            {errors.subject && (
              <p style={{ color: '#ff4d4d', fontSize: '14px', marginTop: '5px', textAlign: 'left' }}>
                {errors.subject}
              </p>
            )}
          </div>

          <div>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message or Question"
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '5px',
                border: '1px solid #fff',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                color: '#fff',
                fontSize: '16px',
                minHeight: '120px',
                resize: 'vertical',
                outline: 'none',
                transition: 'border-color 0.3s ease',
              }}
              onFocus={(e) => (e.target.style.borderColor = '#FFD700')}
              onBlur={(e) => (e.target.style.borderColor = '#fff')}
            />
            {errors.message && (
              <p style={{ color: '#ff4d4d', fontSize: '14px', marginTop: '5px', textAlign: 'left' }}>
                {errors.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            style={{
              backgroundColor: '#FFD700',
              color: '#000',
              padding: '12px 20px',
              border: 'none',
              borderRadius: '5px',
              fontSize: '16px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease, transform 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#e6c200';
              e.target.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#FFD700';
              e.target.style.transform = 'scale(1)';
            }}
          >
            Send Message
          </button>
        </form>

        {submitted && (
          <p style={{ color: '#FFD700', marginTop: '20px', fontSize: '16px' }}>
            Thank you! Your message has been submitted.
          </p>
        )}
      </div>
    </div>
  );
};

export default Contact;