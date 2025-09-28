import {motion} from "framer-motion";
import "./Hero.css"
import heroImage from "./assets/hero-background.jpg"

const Hero = () => {
    const handleExplore = () => {
        const roomsSection = document.getElementById('rooms')
        if (roomsSection) {
            roomsSection.scrollIntoView({ behavior: 'smooth'})
        }
    }
    return (
        <section className="hero">
            <div
                className="hero-image"
                style={{ backgroundImage: `url(${heroImage})` }}
            />

            <div className="hero-overlay"></div>

            <motion.div
                className="hero-content"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
            >
                <h1>MIAMI HOTEL</h1>
                <p>Luxury Redefined</p>
                <button className="explore" onClick={handleExplore}>EXPLORE</button>
            </motion.div>
        </section>
    )
}

export default Hero;