import { section } from "framer-motion/client"
import "./Spa.css"
import React from 'react'

const Spa = () => {
  const handleSpaMenuDownload = () => {
    const link = document.createElement('a');
    link.href = '/documents/spa-menu.pdf'
    link.download = 'Miami-Spa-Menu.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
  const handleReservation = () => {

  }
  return (
    <section id="spa" className="spa-section">
        <div className="spa-content">
            <h2>Spa by Miami</h2>
            <p>Indulge in our luxurious treatments designed to rejuvenate your mind
          and body.</p>
            <div className="spa-actions">
              <button className="booking-btn" onClick={handleReservation}>BOOK A TREATMENT</button>
              <button className="menu-btn" onClick={handleSpaMenuDownload}>SPA MENU</button>
            </div>
        </div>
    </section>

  )
}

export default Spa