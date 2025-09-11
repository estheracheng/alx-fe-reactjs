function Services() {
  const services = [
    {
      title: "Technology Consulting",
      description: "Expert advice on implementing the right technology solutions for your business needs."
    },
    {
      title: "Market Analysis",
      description: "Comprehensive market research and analysis to help you make informed decisions."
    },
    {
      title: "Product Development",
      description: "End-to-end product development services from concept to deployment."
    },
    {
      title: "Digital Marketing",
      description: "Strategic digital marketing campaigns to boost your online presence."
    },
    {
      title: "Cloud Solutions",
      description: "Scalable cloud infrastructure and migration services."
    }
  ];

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ color: '#2c3e50', textAlign: 'center', marginBottom: '30px' }}>Our Services</h1>
      <div style={{ display: 'grid', gap: '20px', maxWidth: '1000px', margin: '0 auto' }}>
        {services.map((service, index) => (
          <div key={index} style={{
            padding: '20px',
            border: '1px solid #bdc3c7',
            borderRadius: '8px',
            backgroundColor: '#ecf0f1',
            transition: 'transform 0.2s'
          }}>
            <h3 style={{ color: '#3498db', margin: '0 0 10px 0' }}>{service.title}</h3>
            <p style={{ margin: 0, color: '#7f8c8d' }}>{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Services;