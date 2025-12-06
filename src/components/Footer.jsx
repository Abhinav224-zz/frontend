import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3 className="footer-title">ShopHub</h3>
          <p className="footer-text">Your one-stop shop for amazing products.</p>
        </div>
        <div className="footer-section">
          <h4 className="footer-heading">Quick Links</h4>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Sign Up</Link></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4 className="footer-heading">Contact</h4>
          <p className="footer-text">Email: support@shophub.com</p>
          <p className="footer-text">Phone: +1 (555) 123-4567</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} ShopHub. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

