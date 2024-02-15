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
              <li className="menu-list-item megamenu-wrapper">
                <a href="shop.html" className="menu-link">
                  {category.name}
                  <i className="bi bi-chevron-down"></i>
                </a>
                <div className="menu-dropdown-wrapper">
                  <div className="menu-dropdown-megamenu">
                    <div className="megamenu-links">
                      <div className="megamenu-products">
                        {category?.productTypes?.name}
                        <img src={category?.productTypes?.img}></img>
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
