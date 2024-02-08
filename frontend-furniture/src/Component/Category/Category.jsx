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
                      <h3 className="megamenu-products-title">Koltuk</h3>
                      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg/220px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg"></img>
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
