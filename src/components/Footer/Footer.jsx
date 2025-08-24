import "./Footer.css"

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">
          <h3>Miami</h3>
          <p>Luxury hospitality at its finest</p>
        </div>
        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#rooms"><i className="fas fa-bed"></i> Rooms & Suites</a></li>
            <li><a href="#restaurant"><i className="fas fa-utensils"></i> Restaurant</a></li>
            <li><a href="#spa"><i className="fas fa-spa"></i> Spa & Wellness</a></li>
            <li><a href="#contact"><i className="fas fa-phone"></i> Contact</a></li>
          </ul>
        </div>
        <div className="footer-social">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a href="#"><i className="fab fa-instagram"></i></a>
            <a href="#"><i className="fab fa-facebook"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Miami Hotel. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer