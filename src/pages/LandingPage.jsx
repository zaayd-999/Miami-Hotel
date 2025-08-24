import Header from "../components/Header/Header";
import Hero from "../components/Hero/Hero";
import Rooms from "../components/Rooms/rooms"
import Restaurant from "../components/Restaurant/Restaurant"
import Spa from "../components/Spa/Spa"
import Gallery from "../components/Gallery/Gallery"
import Contact from "../components/Contact/Contact"
import Footer from "../components/Footer/Footer"



function LandingPage() {
    return (
        <div id="landing-page" className="home-page">
            <Header />
            <Hero />
            <Rooms />
            <Restaurant />
            <Spa />
            <Gallery />
            <Contact />
            <Footer />
        </div>
    );
}

export default LandingPage