import { useRef } from "react"
import "./Contact.css"

const Contact = () => {
  const formRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <section id="contact" className="contact-section">
      <div className="contact-container">
        <div className="contact-info">
          <h2>CONTACT US</h2>
          <p>
            <strong>Address:</strong> 123 Liberty City, Vice City, Jotia Salondryas
          </p>
          <p>
            <strong>Phone:</strong> +212 6 12 34 56 78
          </p>
          <p>
            <strong>Email:</strong> info@miami.com
          </p>
        </div>
        <form ref={formRef} onSubmit={handleSubmit} className="contact-form">
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea placeholder="Your Message" required></textarea>
          <button type="submit">SEND MESSAGE</button>
        </form>
      </div>
      <div className="map-container">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3313.214196212537!2d-5.571664900000001!3d33.8583703!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda05aaf634bac87%3A0x64bfe117d2e27d7d!2z2KfZhNmF2K_Ysdiz2Kkg2KfZhNmI2LfZhtmK2Kkg2KfZhNi52YTZitinINmE2YTZgdmG2YjZhiDZiNin2YTZhdmH2YY!5e0!3m2!1sar!2sma!4v1756066798514!5m2!1sar!2sma" 
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </section>
  )
}

export default Contact