import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import "./Gallery.css";
import gallery1 from "./assets/gallery1.jpg"
import gallery2 from "./assets/gallery2.jpg"
import gallery3 from "./assets/gallery3.jpg"
import { section } from "framer-motion/client";


const images = [
  {
    original: gallery1,
    thumbnail: gallery1,
  },
  {
    original: gallery2,
    thumbnail: gallery2,
  },
  {
    original: gallery3,
    thumbnail: gallery3,
  },
  // Add more images
];


const Gallery = () => {
  return (
    <section id="gallery" className="gallery-section">
      <div className="gallery-container">
        <h2>Gallery</h2>
        <p className="gallery-subtitle">Experience Our Luxury Amenities</p>
        <ImageGallery
          items={images}
          showPlayButton={false}
          showFullscreenButton={true}
          showThumbnails={true}
          showNav={true}
          autoPlay={false}
          slideDuration={450}
          slideInterval={3000}
        />
      </div>
    </section>
  )
}

export default Gallery