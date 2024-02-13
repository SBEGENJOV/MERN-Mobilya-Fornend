import { useEffect, useState } from "react";
import "./Product.css";
import Slider from "react-slick";
import PropTypes from "prop-types";
import { message } from "antd";

const Product = () => {
  return (
    <section className="products">
      <div className="container">
        <div className="section-title">
          <h2>New Arrivals</h2>
          <p>Summer Collection New Morden Design</p>
        </div>
        <div className="product-wrapper product-carousel2">
          <div className="glide__track" data-glide-el="track">
            <ul className="product-list glide__slides">
              <li className="product-item glide__slide">
                <div className="product-image">
                  <a href="#">
                    <img
                      src="https://cdn.pixabay.com/photo/2021/05/26/10/49/woman-6284845_640.jpg"
                      alt=""
                      className="img1"
                    />
                    <img
                      src="https://cdn.pixabay.com/photo/2021/05/26/10/49/woman-6284845_640.jpg"
                      alt=""
                      className="img2"
                    />
                  </a>
                </div>
                <div className="product-info">
                  <a href="$" className="product-title">
                    Analogue Resin Strap
                  </a>
                  <ul className="product-star">
                    <li>
                      <i className="bi bi-star-fill"></i>
                    </li>
                    <li>
                      <i className="bi bi-star-fill"></i>
                    </li>
                    <li>
                      <i className="bi bi-star-fill"></i>
                    </li>
                    <li>
                      <i className="bi bi-star-fill"></i>
                    </li>
                    <li>
                      <i className="bi bi-star-half"></i>
                    </li>
                  </ul>
                  <div className="product-prices">
                    <strong className="new-price">$108.00</strong>
                    <span className="old-price">$165.00</span>
                  </div>
                  <span className="product-discount">-17%</span>
                  <div className="product-links">
                    <button>
                      <i className="bi bi-basket-fill"></i>
                    </button>
                    <button>
                      <i className="bi bi-heart-fill"></i>
                    </button>
                    <a href="#">
                      <i className="bi bi-eye-fill"></i>
                    </a>
                    <a href="#">
                      <i className="bi bi-share-fill"></i>
                    </a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div className="glide__arrows" data-glide-el="controls">
            <button
              className="glide__arrow glide__arrow--left"
              data-glide-dir="<"
            >
              <i className="bi bi-chevron-left"></i>
            </button>
            <button
              className="glide__arrow glide__arrow--right"
              data-glide-dir=">"
            >
              <i className="bi bi-chevron-right"></i>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Product;
