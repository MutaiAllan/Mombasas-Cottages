import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="footer-section">
              <h4>Find Us</h4>
              <p>Nairobi Dog House Street</p>
              <p>Open 9AM - 6PM</p>
              <p>Mon-Sun</p>
            </div>
          </div>
          <div className="col-md-6">
            <div className="footer-section">
              <h4>Contact Us</h4>
              <p>0700 000 000</p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="footer-section">
              <h4>Social Media</h4>
              <div className="social-media-links">
                <img
                  src="https://cdn-icons-png.flaticon.com/128/733/733547.png"
                  alt="Instagram"
                />
                <p>Doghouse 254</p>
                <img
                  src="https://cdn-icons-png.flaticon.com/128/3955/3955024.png"
                  alt="Facebook"
                />
                <p>doghouse_254</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
