import {motion} from "framer-motion"
import React from 'react'
import restaurantImage from './assets/restaurant-image.jpg'
import './Restaurant.css'


function Restaurant() {
  return (
    <section className="restaurant">
      <div 
        className='background-image' 
        style={{ backgroundImage: `url(${restaurantImage})` }} 
      >
        <div className="overlay">
          <motion.div
            className="restaurant-content"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            viewport={{ once: true}}
            transition={{ duration: 0.8 }}
          >
          </motion.div>
        </div>
      </div>
      <div className="description-sec">
        <div className="description">
          <motion.div
            className="description-content"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2>Gourmet Moroccan and International cuisine at Miami's restaurant</h2>
            <p> Indulge in an extraordinary culinary journey where exceptional cuisine meets unparalleled 
      service. Our award-winning chefs create memorable dishes using the freshest local ingredients, 
      served in an elegant setting with breathtaking views. Every meal is a celebration of flavor, 
      artistry, and the true spirit of Mediterranean hospitality.</p>
            <div className="restaurant-actions">
              <button className="book-btn">Book a Table</button>
              <button className="menu-btn">View Menu</button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Restaurant