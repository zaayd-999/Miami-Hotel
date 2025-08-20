import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./rooms.css";
import React from 'react'


const rooms = [
    {
        id:1,
        name: "cj's room",
        price: "2000DH/night",
        images: ["/hotel-room.jpg"],
    },
    // zid rooms li baghi
]
const Rooms = () => {
  return (
    <section id="rooms" classNmaes="rooms-section">
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
                    <button>VIEW DETAILS</button>
                </div>
            ))}
      </div>
    </section>
  )
}

export default Rooms