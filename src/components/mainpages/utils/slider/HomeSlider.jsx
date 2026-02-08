import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import SwiperCore from "swiper";
import { Autoplay } from "swiper/modules";
import "./HomeSlider.css";

SwiperCore.use([Autoplay]);

function HomeSlider() {
  const slides = [
    {
      image:
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=1600&h=400&fit=crop",
      title: "Latest Mobiles",
      subtitle: "Up to 40% Off",
    },
    {
      image:
        "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=1600&h=400&fit=crop",
      title: "Laptops & Electronics",
      subtitle: "Best Deals Today",
    },
    {
      image:
        "https://images.unsplash.com/photo-1445205170230-053b83016050?w=1600&h=400&fit=crop",
      title: "Fashion Sale",
      subtitle: "Min 50% Off",
    },
  ];

  return (
    <div className="slider-container">
      <Swiper
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="slide">
              <img src={slide.image} alt="banner" />
              <div className="overlay">
                <h2>{slide.title}</h2>
                <p>{slide.subtitle}</p>
                <button>Shop Now</button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default HomeSlider;
