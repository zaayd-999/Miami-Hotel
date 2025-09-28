import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import './App.css';
import BookingOptions from "./pages/BookingOptions/BookingOptions"
import Login  from "./pages/Login/Login"
import LandingPage from "./pages/LandingPage";
import Booking from "./pages/Booking/Booking";
import PrivacyPolicy from "./pages/PrivacyPolicy/PrivacyPolicy";
import { AuthProvider } from "./AuthContext";


function App() {
  return (
    <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />}/>
            <Route path="/booking-options" element={<BookingOptions />} />
            <Route path="/login" element={<Login />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          </Routes>
        </Router>
    </AuthProvider>
    
  )
}

export default App;