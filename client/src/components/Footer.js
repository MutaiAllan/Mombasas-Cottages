import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Footer.css';

function Footer() {

  const [isDataLoaded, setIsDataLoaded] = useState(false);

  // Simulate data loading (you should replace this with actual data fetching logic)
  useEffect(() => {
    // Simulate data fetching after a delay (e.g., 2 seconds)
    setTimeout(() => {
      setIsDataLoaded(true);
    }, 9000);
  }, []);

  return (
    <footer className={`footer ${isDataLoaded ? 'visible' : 'hidden'}`}>
      <div className="container_footer">
        <div className="row1_footer">
          <div className="col-md-7">
            <div className="footer-section">
              <h4>Find Us</h4>
              <p>Nairobi Dog House Street</p>
              <p>Open 9AM - 6PM</p>
              <p>Mon-Sun</p>
            </div>
          </div>
          <div className="col-md-7">
            <div className="footer-section">
              <h4>Contact Us</h4>
              <p>0700 000 000</p>
            </div>
          </div>
        </div>
        <div className="row2_footer">
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
