import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import room1 from './assets/hotel-room.jpg'
import room1a from './assets/hotel-room2.jpg'
import room2 from './assets/room2.jpg'
import room3 from './assets/room3.jpg'
import room4 from './assets/room4.jpg'
import "./rooms.css";


const rooms = [
    {
      id: 1,
      name: "cj's room",
      price: "2000DH/night",
      images: [room1, room1a],
    },
    {
      id: 2,
      name: "big smoke's room",
      price: "2000DH/night",
      images: [room2 ],
    },
    {
      id: 3,
      name: "trevor's room",
      price: "2000DH/night",
      images: [room3],
    },
    {
      id: 4,
      name: "Tommy's room",
      price: "2000DH/night",
      images: [room4],
    },
    // add more rooms
]
const Rooms = () => {
  const handleDetails = () => {

  }
  return (
    <section id="rooms" className="rooms-section">
      <h2>ROOMS</h2>
      <div className="rooms-container">
        {rooms.map((room) => (
            <div key={room.id} className="room-card">
              <Swiper
                modules={[Navigation, Pagination]}
                navigation
                pagination={{ clickable: true }}
                className="room-swiper"
              >
                {room.images.map((img, index) => (
                  <SwiperSlide key={index}>
                    <img src={img} alt={room.name} />
                  </SwiperSlide>
                ))}
              </Swiper>
              <h3>{room.name}</h3>
              <p>{room.price}</p>
              <button onClick={handleDetails}>VIEW DETAILS</button>
            </div>
        ))}
      </div>
    </section>
  )
}

export default Rooms