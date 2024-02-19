import { useEffect } from "react";
import ProductItem from "./Product-Item";
import "./Product.css";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { productsViewAction } from "../../Redux/Slices/product/productsSlice";
import Slider from "react-slick";

function NextBtn({ onClick }) {
  return (
    <button className="glide__arrow glide__arrow--right" onClick={onClick}>
      <i className="bi bi-chevron-right"></i>
    </button>
  );
}

NextBtn.propTypes = {
  onClick: PropTypes.func,
};

function PrevBtn({ onClick }) {
  return (
    <button className="glide__arrow glide__arrow--left" onClick={onClick}>
      <i className="bi bi-chevron-left"></i>
    </button>
  );
}

PrevBtn.propTypes = {
  onClick: PropTypes.func,
};

const Product = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state?.products);
  //dispatch
  useEffect(() => {
    dispatch(productsViewAction());
  }, [dispatch]);

  const sliderSettings = {
    dots: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <NextBtn />,
    prevArrow: <PrevBtn />,
    autoplaySpeed: 3000,
    autoplay: true,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 520,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  return (
    <section className="products">
      <div className="container">
        <div className="section-title">
          <h2>Featured Products</h2>
          <p>Summer Collection New Morden Design</p>
        </div>
        <div className="product-wrapper product-carousel">
          <Slider {...sliderSettings}>
            {products.map((product) => (
              <ProductItem productItem={product} key={product._id} />
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default Product;
