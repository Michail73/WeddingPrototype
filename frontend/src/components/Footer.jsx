import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Wedding Vendors</h3>
            <p>Your one-stop destination for finding the perfect wedding services.</p>
          </div>
          <div className="footer-section">
            <h4>Categories</h4>
            <ul>
              <li>Venues</li>
              <li>Catering</li>
              <li>Photography</li>
              <li>Decorations</li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Contact</h4>
            <p>Email: info@weddingvendors.com</p>
            <p>Phone: (555) 123-4567</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {currentYear} Wedding Vendors. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
