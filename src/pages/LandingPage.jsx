import Header from "../components/Header/Header";
import Hero from "../components/Hero/Hero";
import Rooms from "../components/Rooms/rooms"


function LandingPage() {
    return (
        <div className="home-page">
            <Header />
            <Hero />
            <Rooms />
        </div>
    );
}

export default LandingPage