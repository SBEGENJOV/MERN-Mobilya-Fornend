import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Category from "../../Category/Category";
import "./Header.css";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { userPrivateProfileAction } from "../../../Redux/Slices/users/usersSlices";

export default function Header() {
  const user = localStorage.getItem("userInfo");
  const dispatch = useDispatch();
  const { userAuth, profile } = useSelector((state) => state?.users);
  const userId = userAuth?.userInfo?._id;
  useEffect(() => {
    if (userAuth?.userInfo !== null) {
      dispatch(userPrivateProfileAction(userId));
    }
  }, [dispatch, userAuth?.userInfo, userId]);

  const { cart } = useSelector((state) => state?.cart);
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
              <a href={"/"} className="logo">
                SB MOBİLYA
              </a>
            </div>
            <div className="header-center" id="sidebar">
              <nav className="navigation">
                <ul className="menu-list">
                  <li className="menu-list-item">
                    <a href="/" className="menu-link active">
                      Anasayfa
                    </a>
                  </li>
                  <li className="menu-list-item megamenu-wrapper">
                    <a href="/campain" className="menu-link">
                      KAMPANYALAR
                    </a>
                  </li>
                  <li className="menu-list-item">
                    <a href="/blog" className="menu-link">
                      YAZILAR
                    </a>
                  </li>
                  <li className="menu-list-item">
                    <a href="/contact" className="menu-link">
                      İLETİŞİM
                    </a>
                  </li>
                </ul>
              </nav>
              <i className="bi-x-circle" id="close-sidebar"></i>
            </div>
            <div className="header-right">
              <div className="header-right-links">
                {user ? (
                  <a href={"/user"} className="header-account">
                    <i className="bi bi-person"></i>
                  </a>
                ) : (
                  <a href={"/auth"} className="header-account">
                    <i className="bi bi-person"></i>
                  </a>
                )}
                <button className="search-button">
                  <i className="bi bi-search"></i>
                </button>
                <div className="header-cart">
                  <a href="cart.html" className="header-cart-link">
                    <i className="bi bi-heart"></i>
                    <span className="header-cart-count">
                      {userAuth?.userInfo === null
                        ? 0
                        : profile?.user?.likedProduct?.length}
                    </span>
                  </a>
                </div>
                <div className="header-cart">
                  <a href="/cart" className="header-cart-link">
                    <i className="bi bi-bag"></i>
                    <span className="header-cart-count">{cart.length}</span>
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
