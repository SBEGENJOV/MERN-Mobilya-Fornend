import "./Category.css";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { categoryViewAction } from "../../Redux/Slices/categories/categoriesSlice";
import { useEffect } from "react";

export default function Category() {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state?.category);
  //dispatch
  useEffect(() => {
    dispatch(categoryViewAction());
  }, [dispatch]);
  return (
    <header>
      <div
        className="header-center"
        id="sidebar"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <nav className="navigation">
          <ul className="menu-list">
            {categories?.categories?.map((category) => (
              <li
                key={category._id}
                className="menu-list-item megamenu-wrapper"
              >
                <a href="shop.html" className="menu-link">
                  {category.name}
                  <i className="bi bi-chevron-down"></i>
                </a>
                <div className="menu-dropdown-wrapper">
                  <div className="menu-dropdown-megamenu">
                    <div className="megamenu-links">
                      {category?.productTypes?.map((productTypes) => (
                        <div
                          key={productTypes._id}
                          className="megamenu-products"
                        >
                          <div style={{ textAlign: "center" }}>
                            {productTypes?.name}
                          </div>
                          <br />
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            <img src={productTypes?.img} alt="Product Image" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

Category.propTypes = {
  categoryItem: PropTypes.object,
};
