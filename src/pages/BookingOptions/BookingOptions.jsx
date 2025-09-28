import { useNavigate } from "react-router-dom"
import { useAuth } from "../../AuthContext"
import './BookingOptions.css'

const BookingOptions = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleGuestBooking = () => {
        navigate('/booking', { state: { guest: true } });
    }

    const handleRegister = () => {
        navigate('/register', { state: { redirect: '/booking' } });
    }

    const handleLogin = () => {
        navigate('/login', { state: { redirect: '/booking' } });
    }

    return (
        <div className="booking-options">
            <div className="options-container">
                <h1>Book Now</h1>
                <p>Choose how you'd like to proceed:</p>
                

                <div className="options-grid">
                    <div className="options-card">
                        <h3>Continue as Guest</h3>
                        <p>Book now without creating an account</p>
                        <button onClick={handleGuestBooking} className="option-btn guest">
                            Book as Guest
                        </button>
                        <ul className="benefits">
                            <li>✓ Quick booking process</li>
                            <li>✓ No password required</li>
                            <li>✓ Email confirmation</li>
                        </ul>
                    </div>

                    <div className="option-card highlighted">
                        <h3>Create Account</h3>
                        <p>Enjoy benefits for future bookings</p>
                        <button onClick={handleRegister} className="option-btn primary">
                            Create Account & Book
                        </button>
                        <ul className="benefits">
                            <li>✓ Save booking preferences</li>
                            <li>✓ Faster future bookings</li>
                            <li>✓ Exclusive member offers</li>
                            <li>✓ Booking history</li>
                        </ul>
                    </div>

                    <div className="option-card">
                        <h3>Already have an account?</h3>
                        <button onClick={handleLogin} className="option-btn secondary">
                            Sign In
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default BookingOptions