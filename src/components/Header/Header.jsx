import { useState, useEffect } from "react"
import React from 'react'
import logo from './miami_logo_rm.png'
import './Header.css'

export default function Header() {
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
            <a href="/" className="logo-link">
                <img src={logo} alt="MIAMI" className="logo-image" />
            </a>
            <nav>
                <ul>
                    <li><a href="#rooms">ROOMS</a></li>
                    <li><a href="#restau">RESTAURANTS</a></li>
                    <li><a href="#spa">SPA BY MIAMI</a></li>
                    <li><a href="#gallery">GALLERY</a></li>
                    <li><a href="#contacts">CONTACT</a></li>
                </ul>
            </nav>
            <div className="nav-actions">
                <button className="booking">BOOK NOW</button>
            </div>
        </header>
    )
}