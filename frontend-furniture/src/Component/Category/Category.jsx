import "./Category.css";
import PropTypes from "prop-types";

export default function Category() {
  return (
    <header>
      <div
        className="header-center"
        id="sidebar"
        style={{ display: "flex", justifyContent: "center" }}
      >
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
                      <h3>Koltuk</h3>
                      <img src="https://e-commerce-udemy.netlify.app/img/categories/categories1.png"></img>
                    </div>
                    <div className="megamenu-products">
                      <h3>Deneme</h3>
                      <img src="https://e-commerce-udemy.netlify.app/img/categories/categories2.png"></img>
                    </div>
                    <div className="megamenu-products">
                      <h3>Deneme 2</h3>
                      <img src="https://e-commerce-udemy.netlify.app/img/categories/categories4.png"></img>
                    </div>
                    <div className="megamenu-products">
                      <h3>Deneme 3</h3>
                      <img src="https://e-commerce-udemy.netlify.app/img/categories/categories5.png"></img>
                    </div>
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
