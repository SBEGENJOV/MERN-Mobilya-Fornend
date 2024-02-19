import Category from "../../Category/Category";
import "./Header.css";
import PropTypes from "prop-types";

export default function Header() {
  return (
    <header>
      <div className="global-notification">
        <div className="container">
          <p>
            Mobilya Denilince Aklına ilk geldiysek
            <a href="shop.html"> Şimdi AL</a>
          </p>
        </div>
      </div>
      <div className="header-row">
        <div className="container">
          <div className="header-wrapper">
            <div className="header-mobile">
              <i className="bi bi-list" id="btn-menu"></i>
            </div>
            <div className="header-left">
              <a href="index.html" className="logo">
                SB MOBİLYA
              </a>
            </div>
            <div className="header-center" id="sidebar">
              <nav className="navigation">
                <ul className="menu-list">
                  <li className="menu-list-item">
                    <a href="index.html" className="menu-link active">
                      Anasayfa
                    </a>
                  </li>
                  <li className="menu-list-item megamenu-wrapper">
                    <a href="shop.html" className="menu-link">
                      KAMPANYALAR
                    </a>
                  </li>
                  <li className="menu-list-item">
                    <a href="blog.html" className="menu-link">
                      YAZILAR
                    </a>
                  </li>
                  <li className="menu-list-item">
                    <a href="contact.html" className="menu-link">
                      İLETİŞİM
                    </a>
                  </li>
                </ul>
              </nav>
              <i className="bi-x-circle" id="close-sidebar"></i>
            </div>
            <div className="header-right">
              <div className="header-right-links">
                <a href="account.html" className="header-account">
                  <i className="bi bi-person"></i>
                </a>
                <button className="search-button">
                  <i className="bi bi-search"></i>
                </button>
                <a href="#">
                  <i className="bi bi-heart"></i>
                </a>
                <div className="header-cart">
                  <a href="cart.html" className="header-cart-link">
                    <i className="bi bi-bag"></i>
                    <span className="header-cart-count">0</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Category />
    </header>
  );
}

Header.propTypes = {
  isSearchShow: PropTypes.bool,
  setIsSearchShow: PropTypes.func,
};
