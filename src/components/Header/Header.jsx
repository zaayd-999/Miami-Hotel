import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { Link, useLocation} from 'react-router-dom'
import logo from './assets/miami_logo_rm.png'
import { useAuth } from '../../AuthContext'
import './Header.css'
import { div } from "framer-motion/client"

export default function Header() {
    const [sidebarActive, setSidebarActive] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)
    const location = useLocation()

    const { isLoggedIn } = useAuth()
    const navigate = useNavigate()

    const handleNavClick = (e, sectionId) => {
        e.preventDefault()
        
        if (location.pathname !== '/') {
            window.location.href = `/#${sectionId}`
        } else {
            const element = document.getElementById(sectionId)
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' })
            }
        }
    }

    
    const handleBookingClick = () => {
        //window.open('/booking', '_blank', 'noopener,noreferrer')
        if (isLoggedIn) {
            navigate ('/booking')
        } else {
            navigate ('/booking-options')
        }
    }

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])


    //close sidebar
    useEffect(() => {
        setSidebarActive(false);
    }, [location])


    // prevent body scroll
    useEffect(() => {
        if (sidebarActive) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [sidebarActive])
    return (
        <header className={`navbar ${isScrolled ? "scrolled" : ""} ${sidebarActive ? "sidebar-open" : ""}`}>
            
            <a href="/" className="logo-link">
                <img src={logo} alt="MIAMI" className="logo-image" />
            </a>


            <nav className={`nav-links ${sidebarActive ? "active" : ""}`}>
                <ul>
                    <li><a href="#rooms" onClick={(e) => handleNavClick(e, 'rooms')}>ROOMS</a></li>
                    <li><a href="#restaurant" onClick={(e) => handleNavClick(e, 'restaurant')}>RESTAURANT</a></li>
                    <li><a href="#spa" onClick={(e) => handleNavClick(e, 'spa')}>SPA BY MIAMI</a></li>
                    <li><a href="#gallery" onClick={(e) => handleNavClick(e, 'gallery')}>GALLERY</a></li>
                    <li><a href="#contact" onClick={(e) => handleNavClick(e, 'contact')}>CONTACT</a></li>
                </ul>
            </nav>

            
            <div className="nav-actions">
                <button 
                    className="booking"
                    onClick={handleBookingClick}
                    aria-label="Book Now"
                >BOOK NOW</button>
            </div>


            <button 
                className="mobile-menu-btn"
                onClick={() => setSidebarActive(!sidebarActive)}
                aria-label="Toggle menu"
            >
                {sidebarActive? (
                    <svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="32px" fill="#e3e3e3">
                        <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="32px" fill="#e3e3e3">
                        <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/>
                    </svg>
                )}
            </button>


            {/* Mobile Overlay */}
            {sidebarActive && (
                <div
                    className="nav-overlay"
                    onClick={() => setSidebarActive(false)}
                ></div>
            )}
        </header>
    )
}