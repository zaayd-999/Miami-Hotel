import {motion} from "framer-motion"
import restaurantImage from './assets/restaurant-image.jpg'
import './Restaurant.css'


function Restaurant() {
  const handleMenuDownload = () => {
    const link = document.createElement('a');
    link.href = '/documents/restaurant-menu.pdf'
    link.download = 'Miami-Restaurant-Menu.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
  const handleReservation = () => {

  }
  return (
    <section id="restaurant" className="restaurant">
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
            <div className="description-sec">
              <div className="description">
                <h2>Gourmet Moroccan and International cuisine at Miami's restaurant</h2>
                <p> Indulge in an extraordinary culinary journey where exceptional cuisine meets unparalleled 
            service. Our award-winning chefs create memorable dishes using the freshest local ingredients, 
            served in an elegant setting with breathtaking views. Every meal is a celebration of flavor, 
            artistry, and the true spirit of Mediterranean hospitality.</p>
                <div className="restaurant-actions">
                  <button className="booking-btn" onClick={handleReservation}>Book a Table</button>
                  <button className="menu-btn" onClick={handleMenuDownload}>View Menu</button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
    </section>
  )
}

export default Restaurant