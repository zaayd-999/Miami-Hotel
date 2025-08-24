import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom';
import logo from './assets/miami_logo_rm.png'
import './Header.css'

export default function Header() {
    const navigate = useNavigate()
    const handleBookingClick = () => {
        window.open('/booking', '_blank', 'noopener,noreferrer')
    }
    const [isScrolled, setIsScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])
    return (
        <header className={`navbar ${isScrolled ? "scrolled" : ""}`}>
            <a href="#landing-page" className="logo-link">
                <img src={logo} alt="MIAMI" className="logo-image" />
            </a>
            <nav>
                <ul>
                    <li><a href="#rooms">ROOMS</a></li>
                    <li><a href="#restaurant">RESTAURANT</a></li>
                    <li><a href="#spa">SPA BY MIAMI</a></li>
                    <li><a href="#gallery">GALLERY</a></li>
                    <li><a href="#contact">CONTACT</a></li>
                </ul>
            </nav>
            <div className="nav-actions">
                <button 
                    className="booking"
                    onClick={handleBookingClick}
                    aria-label="Book Now"
                >BOOK NOW</button>
            </div>
        </header>
    )
}