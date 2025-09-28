import { useAuth} from '../../AuthContext'
import { useNavigate, useLocation } from 'react-router-dom'
import { useState } from 'react'
import './Booking.css'

const Booking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isLoggedIn } = useAuth();
  const isGuest = location.state?.guest || !isLoggedIn;


  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
  })
  return (
    <div className='booking-page'>
      <h1>Make a Reservation</h1>

      {isGuest && (
        <div className="guest-notice">
          <p>You're booking as a guest. 
            <button onClick={() => navigate('/register')}>
              Create an account
            </button> to save your details for next time.
          </p>
        </div>
      )}
    </div>
  )
}

export default Booking