import { useRef } from "react";
import "./Info.css";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../Redux/Slices/cart/cartSlice";
import { message } from "antd";

const Info = ({ singleProduct }) => {
  const dispatch = useDispatch();

  const filteredCard = JSON.parse(localStorage.getItem("furnitureItems")).find(
    (cartItem) => cartItem._id === singleProduct?.product?._id
  );

  const originalPrice = singleProduct?.product?.price?.current;
  const discountPercentage = singleProduct?.product?.price?.discount;

  // İndirimli fiyatı hesaplama
  const discountedPrice =
    originalPrice - (originalPrice * discountPercentage) / 100;

  const quantityRef = useRef();

  const handleClick = () => {
    const currentURL = window.location.href;
    navigator.clipboard
      .writeText(currentURL)
      .then(() => {
        message.success("Link başarıyla kopyalandı.");
      })
      .catch((error) => {
        message.success("Link kopyalanırken hata oluştu.");
      });
  };

  return (
    <div className="product-info">
      <h1 className="product-title">{singleProduct?.product?.name}</h1>
      <div className="product-review">
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
        <span>2 Yorum</span>
      </div>
      <div className="product-price">
        <s className="old-price">${originalPrice.toFixed(2)}</s>
        <strong className="new-price">${discountedPrice.toFixed(2)}</strong>
      </div>
      <div
        className="product-description"
        dangerouslySetInnerHTML={{
          __html: singleProduct?.product?.description,
        }}
      ></div>
      <form className="variations-form">
        <div className="variations">
          <div className="colors">
            <div className="colors-label">
              <span>Renk</span>
            </div>
            <div className="colors-wrapper">
              {singleProduct?.product?.colors.map((color, index) => (
                <div className="color-wrapper" key={index}>
                  <label
                    style={{
                      backgroundColor: `#${color}`,
                    }}
                  >
                    {/* <input type="radio" name="product-color" /> */}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div className="values">
            <div className="values-label">
              <i className="bi bi-qr-code-scan"></i>
              <span> Stok Kod: </span> <br />
              <strong>{singleProduct?.product?.stokCode}</strong>
              <br />
            </div>
          </div>
          <div className="values">
            <div className="values-label">
              <i className="bi bi-activity"></i>
              <span> Stok Adet: </span> <br />
              <strong>{singleProduct?.product?.stokCount}</strong>
              <br />
            </div>
          </div>
          <div className="values">
            <div className="values-label">
              <i className="bi bi-award"></i>
              <span> Garanti Süresi: </span> <br />
              <strong>{singleProduct?.product?.warranty} Ay</strong>
              <br />
            </div>
          </div>
          <div className="cart-button">
            <input
              type="number"
              defaultValue="1"
              min="1"
              id="quantity"
              ref={quantityRef}
            />
            <button
              className="btn btn-lg btn-primary"
              id="add-to-cart"
              type="button"
              disabled={filteredCard}
              onClick={() =>
                dispatch(
                  addToCart({
                    ...singleProduct?.product,
                    price: discountedPrice,
                    quantity: parseInt(quantityRef.current.value),
                  })
                )
              }
            >
              Sepete Ekle
            </button>
          </div>
          <div className="product-extra-buttons">
            <a href="#">
              <i className="bi bi-globe"></i>
              <span> Ulusal Ölçü</span>
            </a>
            <a href="#">
              <i className="bi bi-heart"></i>
              <span> Favorilere Ekle</span>
            </a>
            <button
              style={{ backgroundColor: "transparent" }}
              onClick={handleClick}
            >
              <i className="bi bi-share"></i>
              <span> Ürünü Paylaş</span>
            </button>
          </div>
        </div>
      </form>
      <div className="divider"></div>
      <div className="product-meta">
        <div className="product-sku">
          <span>Ürün Kod: </span>
          <strong>BE45VGRT</strong>
        </div>
        <div className="product-categories">
          <span>Kategori: </span>
          <strong>Pants , Women</strong>
        </div>
        <div className="product-tags">
          <span>Başlıklar: </span>
          <a href="#">black</a>,<a href="#">white</a>
        </div>
      </div>
    </div>
  );
};

export default Info;

Info.propTypes = {
  singleProduct: PropTypes.object,
};
