const Contact = () => {
  return (
    <div className="page-container">
      <div className="page-content">
        <h1 className="page-title">Contact Us</h1>
        <div className="contact-info">
          <div className="contact-section">
            <h2 className="section-heading">Get in Touch</h2>
            <p className="section-text">
              We'd love to hear from you! Reach out to us through any of the following methods.
            </p>
          </div>
          <div className="contact-details">
            <div className="contact-item">
              <h3 className="contact-label">Email</h3>
              <p className="contact-value">support@shophub.com</p>
            </div>
            <div className="contact-item">
              <h3 className="contact-label">Phone</h3>
              <p className="contact-value">+1 (555) 123-4567</p>
            </div>
            <div className="contact-item">
              <h3 className="contact-label">Address</h3>
              <p className="contact-value">
                123 Shopping Street<br />
                Commerce City, CC 12345<br />
                United States
              </p>
            </div>
            <div className="contact-item">
              <h3 className="contact-label">Business Hours</h3>
              <p className="contact-value">
                Monday - Friday: 9:00 AM - 6:00 PM<br />
                Saturday: 10:00 AM - 4:00 PM<br />
                Sunday: Closed
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

