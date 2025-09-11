function About() {
  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ color: '#2c3e50', borderBottom: '2px solid #3498db', paddingBottom: '10px' }}>About Us</h1>
      <p style={{ fontSize: '1.1em', lineHeight: '1.6', color: '#34495e' }}>
        Our company has been providing top-notch services since 1990. We specialize in various 
        fields including technology, marketing, and consultancy. With over 30 years of experience, 
        we've helped thousands of businesses achieve their goals and reach new heights.
      </p>
      <div style={{ marginTop: '30px' }}>
        <h2 style={{ color: '#3498db' }}>Our Mission</h2>
        <p style={{ backgroundColor: '#f8f9fa', padding: '15px', borderRadius: '5px' }}>
          To empower businesses through innovative technology solutions and strategic consulting, 
          helping them thrive in an ever-changing digital landscape.
        </p>
      </div>
    </div>
  );
}

export default About;