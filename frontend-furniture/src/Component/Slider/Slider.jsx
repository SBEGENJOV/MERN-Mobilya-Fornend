import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import SliderItem from "./SliderItem";
import "./Slider.css"; // CSS dosyasını import ediyoruz

const Sliders = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % 3);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + 3) % 3);
  };

  useEffect(() => {
    //Slider otomatik çalışmasını sağlama kodu
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % 3);
    }, 10000);

    return () => clearInterval(interval); //Bellek sızıntısını önlemek için bir daha bir daha çalışmasın diye fonksiyon çalıştıkdan sonra temizliyoruz
  }, []);

  return (
    <section className="slider">
      <div className="slider-elements">
        {currentSlide === 0 && (
          <SliderItem imageSrc="https://images.unsplash.com/photo-1631679706909-1844bbd07221?q=80&w=1992&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
        )}
        {currentSlide === 1 && (
          <SliderItem imageSrc="https://plus.unsplash.com/premium_photo-1678402545080-2353b489c0c3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
        )}
        {currentSlide === 2 && (
          <SliderItem imageSrc="https://images.unsplash.com/photo-1503174971373-b1f69850bded?q=80&w=1826&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
        )}
      </div>

      <div className="slider-buttons">
        <button onClick={prevSlide}>
          <i className="bi bi-chevron-left"></i>
        </button>
        <button onClick={nextSlide}>
          <i className="bi bi-chevron-right"></i>
        </button>
      </div>

      <div className="slider-dots">
        <button
          className={`slider-dot ${currentSlide === 0 ? "active" : ""}`}
          onClick={() => setCurrentSlide(0)}
        >
          <span></span>
        </button>
        <button
          className={`slider-dot ${currentSlide === 1 ? "active" : ""}`}
          onClick={() => setCurrentSlide(1)}
        >
          <span></span>
        </button>
        <button
          className={`slider-dot ${currentSlide === 2 ? "active" : ""}`}
          onClick={() => setCurrentSlide(2)}
        >
          <span></span>
        </button>
      </div>
    </section>
  );
};

export default Sliders;

Sliders.propTypes = {
  count: PropTypes.number,
  sliderRes: PropTypes.array,
};
