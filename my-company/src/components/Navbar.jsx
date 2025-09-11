import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();

  const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    padding: '10px 20px',
    margin: '0 5px',
    borderRadius: '4px',
    transition: 'background-color 0.3s'
  };

  const activeLinkStyle = {
    ...linkStyle,
    backgroundColor: '#2980b9'
  };

  return (
    <nav style={{
      backgroundColor: '#3498db',
      padding: '15px 0',
      marginBottom: '20px'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <div style={{
          display: 'flex',
          gap: '10px'
        }}>
          <Link 
            to="/" 
            style={location.pathname === '/' ? activeLinkStyle : linkStyle}
          >
            Home
          </Link>
          <Link 
            to="/about" 
            style={location.pathname === '/about' ? activeLinkStyle : linkStyle}
          >
            About
          </Link>
          <Link 
            to="/services" 
            style={location.pathname === '/services' ? activeLinkStyle : linkStyle}
          >
            Services
          </Link>
          <Link 
            to="/contact" 
            style={location.pathname === '/contact' ? activeLinkStyle : linkStyle}
          >
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;