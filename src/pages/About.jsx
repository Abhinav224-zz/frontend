const About = () => {
  return (
    <div className="page-container">
      <div className="page-content">
        <h1 className="page-title">About Us</h1>
        <div className="page-section">
          <h2 className="section-heading">Welcome to ShopHub</h2>
          <p className="section-text">
            ShopHub is your one-stop destination for amazing products at great prices. 
            We are committed to providing you with the best shopping experience possible.
          </p>
        </div>
        <div className="page-section">
          <h2 className="section-heading">Our Mission</h2>
          <p className="section-text">
            Our mission is to make online shopping simple, convenient, and enjoyable for everyone. 
            We strive to offer quality products and excellent customer service.
          </p>
        </div>
        <div className="page-section">
          <h2 className="section-heading">Why Choose Us?</h2>
          <ul className="feature-list">
            <li>Wide selection of quality products</li>
            <li>Competitive prices</li>
            <li>Secure and easy checkout</li>
            <li>Excellent customer support</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;

