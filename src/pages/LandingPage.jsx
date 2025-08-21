import Header from "../components/Header/Header";
import Hero from "../components/Hero/Hero";
import Rooms from "../components/Rooms/rooms"
import Restaurant from "../components/Restaurant/Restaurant"



function LandingPage() {
    return (
        <div className="home-page">
            <Header />
            <Hero />
            <Rooms />
            <Restaurant />
        </div>
    );
}

export default LandingPage