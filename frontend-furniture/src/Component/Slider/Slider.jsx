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
          <SliderItem imageSrc="https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=600" />
        )}
        {currentSlide === 1 && (
          <SliderItem imageSrc="https://images.pexels.com/photos/276528/pexels-photo-276528.jpeg?auto=compress&cs=tinysrgb&w=600" />
        )}
        {currentSlide === 2 && (
          <SliderItem imageSrc="https://images.pexels.com/photos/271816/pexels-photo-271816.jpeg?auto=compress&cs=tinysrgb&w=600" />
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
