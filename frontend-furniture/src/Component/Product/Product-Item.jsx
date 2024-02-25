import "./Product-Item.css";
import PropTypes from "prop-types";
import { message } from "antd";
import { addToCart } from "../../Redux/Slices/cart/cartSlice";
import { useDispatch } from "react-redux";

const ProductItem = ({ productItem }) => {
  const originalPrice = productItem?.price?.current;
  const discountPercentage = productItem?.price?.discount;
  const dispatch = useDispatch();

  const filteredCard = [JSON.parse(localStorage.getItem("furnitureItems"))].find(
    (cartItem) => cartItem._id === productItem._id
  );

  // İndirimli fiyatı hesaplama
  const discountedPrice =
    originalPrice - (originalPrice * discountPercentage) / 100;

  const handleClick = (e) => {
    e.preventDefault();
    const currentURL = window.location.href;
    navigator.clipboard
      .writeText(`${currentURL}product/${productItem._id}`)
      .then(() => {
        message.success("Link başarıyla kopyalandı.");
      })
      .catch((error) => {
        message.success("Link kopyalanırken hata oluştu.");
      });
  };
  return (
    <div className="product-item glide__slide glide__slide--active">
      <div className="product-image">
        <a href={`/product/${productItem._id}`}>
          <img src={productItem.img[0]} alt="" className="img1" />
          <img src={productItem.img[1]} alt="" className="img2" />
        </a>
      </div>
      <div className="product-info">
        <a href="$" className="product-title">
          {productItem.name}
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
          <strong className="new-price">${discountedPrice}</strong>
          <span className="old-price">${productItem?.price?.current}</span>
        </div>
        <span className="product-discount">
          -{productItem?.price?.discount}%
        </span>
        <div className="product-links">
          <button
            disabled={filteredCard}
            onClick={() =>
              dispatch(
                addToCart({
                  ...productItem,
                  price: discountedPrice,
                  quantity: 1,
                })
              )
            }
            className="add-to-cart"
          >
            <i className="bi bi-basket-fill"></i>
          </button>
          <button>
            <i className="bi bi-heart-fill"></i>
          </button>

          <a href={`/product/${productItem._id}`} className="product-link">
            <i className="bi bi-eye-fill"></i>
          </a>
          <a onClick={handleClick}>
            <i className="bi bi-share-fill"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
ProductItem.propTypes = {
  productItem: PropTypes.object,
  setCartItems: PropTypes.func,
};
