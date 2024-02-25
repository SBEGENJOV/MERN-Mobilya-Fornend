import "./Product-Item.css";
import PropTypes from "prop-types";
import { addToCart } from "../../Redux/Slices/cart/cartSlice";
import { useDispatch } from "react-redux";

const ProductCategoryItem = ({ productItem, deg }) => {
  const dispatch = useDispatch();

  const deger = deg;
  const originalPrice = productItem?.price?.current;
  const discountPercentage = productItem?.price?.discount;
  const discountedPrice =
    originalPrice - (originalPrice * discountPercentage) / 100;
  return (
    <>
      {deger && (
        <div className="product-item">
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
              <strong className="new-price">
                ${discountedPrice.toFixed(2)}
              </strong>
              <span className="old-price">${originalPrice.toFixed(2)}</span>
            </div>
            <span className="product-discount">
              -{productItem.price.discount}%
            </span>
            <div className="product-links">
              <button
                className="add-to-cart"
                onClick={() =>
                  dispatch(
                    addToCart({
                      ...productItem?.product,
                      price: discountedPrice,
                    })
                  )
                }
              >
                <i className="bi bi-basket-fill"></i>
              </button>
              <button>
                <i className="bi bi-heart-fill"></i>
              </button>
              <a href={`/product/${productItem._id}`} className="product-link">
                <i className="bi bi-eye-fill"></i>
              </a>
              <a href="#">
                <i className="bi bi-share-fill"></i>
              </a>
            </div>
          </div>
        </div>
      )}
      {!deger && <h2>agu bugu</h2>}
    </>
  );
};

export default ProductCategoryItem;

ProductCategoryItem.propTypes = {
  productItem: PropTypes.object,
  setCartItems: PropTypes.func,
  deg: PropTypes.bool,
};
