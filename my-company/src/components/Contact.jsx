import { useState } from 'react';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you for your message, ${formData.name}! We'll get back to you soon.`);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1 style={{ color: '#2c3e50', textAlign: 'center' }}>Contact Us</h1>
      
      <form onSubmit={handleSubmit} style={{
        backgroundColor: '#f8f9fa',
        padding: '30px',
        borderRadius: '8px',
        border: '1px solid #dee2e6'
      }}>
        <div style={{ marginBottom: '20px' }}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '12px',
              border: '1px solid #ced4da',
              borderRadius: '4px',
              fontSize: '16px'
            }}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '12px',
              border: '1px solid #ced4da',
              borderRadius: '4px',
              fontSize: '16px'
            }}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
            rows="5"
            style={{
              width: '100%',
              padding: '12px',
              border: '1px solid #ced4da',
              borderRadius: '4px',
              fontSize: '16px',
              resize: 'vertical'
            }}
          />
        </div>

        <button type="submit" style={{
          backgroundColor: '#3498db',
          color: 'white',
          padding: '12px 30px',
          border: 'none',
          borderRadius: '4px',
          fontSize: '16px',
          cursor: 'pointer',
          width: '100%'
        }}>
          Send Message
        </button>
      </form>

      <div style={{ marginTop: '30px', textAlign: 'center' }}>
        <h3>Other Ways to Reach Us</h3>
        <p>Email: info@company.com</p>
        <p>Phone: +1 (555) 123-4567</p>
        <p>Address: 123 Business St, City, State 12345</p>
      </div>
    </div>
  );
}

export default Contact;