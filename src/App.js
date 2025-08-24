import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import './App.css';
import LandingPage from "./pages/LandingPage";
import Booking from "./pages/Booking/Booking";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />}/>
        <Route path="/booking" element={<Booking />} />
      </Routes>
    </Router>
  )
}

export default App;