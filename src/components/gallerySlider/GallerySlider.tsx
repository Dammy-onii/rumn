import { useState, useEffect } from "react";

const images = [
  "https://res.cloudinary.com/dqul1bz0e/image/upload/v1738860130/dele/xbtiqpcjv8q19wilrk3y.jpg",
  "https://res.cloudinary.com/dqul1bz0e/image/upload/v1738860126/dele/jeesxhvlniuttopoonxj.jpg",
  "https://res.cloudinary.com/dqul1bz0e/image/upload/v1738860125/dele/v7hzgszy1uz7pjrltxjv.jpg",
  "https://res.cloudinary.com/dqul1bz0e/image/upload/v1738860124/dele/i6kk4d3g4psnhih3is5i.jpg",
];

const GallerySlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Function to go to the next slide
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // Function to go to the previous slide
  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  // Auto-slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div className="relative w-full h-full bg-gray-200 overflow-hidden">
      {/* Slider */}
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Slide ${index + 1}`}
            className="w-[50vw] h-fit object-cover "
          />
        ))}
      </div>

      {/* Left Arrow */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-lg hover:bg-gray-700"
      >
        &#10094;
      </button>

      {/* Right Arrow */}
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-lg hover:bg-gray-700"
      >
        &#10095;
      </button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {images.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full ${
              currentIndex === index ? "bg-blue-500" : "bg-gray-300"
            } cursor-pointer`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default GallerySlider;
