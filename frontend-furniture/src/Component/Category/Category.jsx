import "./Category.css";
import PropTypes from "prop-types";
//import "./Header";

export default function Category() {
  return (
    <header>
      <div className="header-center" id="sidebar">
        <nav className="navigation">
          <ul className="menu-list">
            <li className="menu-list-item megamenu-wrapper">
              <a href="shop.html" className="menu-link">
                Shop
                <i className="bi bi-chevron-down"></i>
              </a>
              <div className="menu-dropdown-wrapper">
                <div className="menu-dropdown-megamenu">
                  <div className="megamenu-links">
                    <div className="megamenu-products">
                      <h3 className="megamenu-products-title">Shop Style</h3>
                      <ul className="megamenu-menu-list">
                        <li>
                          <a href="#">Shop Standard</a>
                        </li>
                        <li>
                          <a href="#">Shop Full</a>
                        </li>
                        <li>
                          <a href="#">Shop Only Categories</a>
                        </li>
                        <li>
                          <a href="#">Shop Image Categories</a>
                        </li>
                        <li>
                          <a href="#">Shop Sub Categories</a>
                        </li>
                        <li>
                          <a href="#">Shop List</a>
                        </li>
                        <li>
                          <a href="#">Hover Style 1</a>
                        </li>
                        <li>
                          <a href="#">Hover Style 2</a>
                        </li>
                        <li>
                          <a href="#">Hover Style 3</a>
                        </li>
                      </ul>
                    </div>
                    <div className="megamenu-products">
                      <h3 className="megamenu-products-title">Filter Layout</h3>
                      <ul className="megamenu-menu-list">
                        <li>
                          <a href="#">Sidebar</a>
                        </li>
                        <li>
                          <a href="#">Filter Side Out</a>
                        </li>
                        <li>
                          <a href="#">Filter Dropdown</a>
                        </li>
                        <li>
                          <a href="#">Filter Drawer</a>
                        </li>
                      </ul>
                    </div>
                    <div className="megamenu-products">
                      <h3 className="megamenu-products-title">Shop Loader</h3>
                      <ul className="megamenu-menu-list">
                        <li>
                          <a href="#">Shop Pagination</a>
                        </li>
                        <li>
                          <a href="#">Shop Infinity</a>
                        </li>
                        <li>
                          <a href="#">Shop Load More</a>
                        </li>
                        <li>
                          <a href="#">Cart Modal</a>
                        </li>
                        <li>
                          <a href="#">Cart Drawer</a>
                        </li>
                        <li>
                          <a href="#">Cart Page</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="megamenu-single">
                    <a href="#">
                      <img src="img/mega-menu.jpg" alt="" />
                    </a>
                    <h3 className="megamenu-single-title">
                      JOIN THE LAYERING GANG
                    </h3>
                    <h4 className="megamenu-single-subtitle">
                      Suspendisse faucibus nunc et pellentesque
                    </h4>
                    <a href="#" className="megamenu-single-button btn btn-sm">
                      Shop Now
                    </a>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

Category.propTypes = {
  isSearchShow: PropTypes.bool,
  setIsSearchShow: PropTypes.func,
};
