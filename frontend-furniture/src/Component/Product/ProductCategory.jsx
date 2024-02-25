// import { useEffect, useState } from "react";
// import { message } from "antd";
// import { useParams } from "react-router-dom";
import Pagination from "./Pagination";

import ProductCategoryItem from "./ProductCategoryItem";
import "./Product-Item.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductTypeAction } from "../../Redux/Slices/product type/productTypeSlice";

const ProductCategory = () => {
  const { productTypeId } = useParams();
  const dispatch = useDispatch();
  const { productTypes } = useSelector((state) => state?.productTypes);
  useEffect(() => {
    dispatch(getProductTypeAction(productTypeId));
    productTypes?.productType?.products.length < 1
      ? setdeg(false)
      : setdeg(true);
  }, [dispatch, productTypeId, productTypes?.productType?.products.length]);
  const [der, setdeg] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const productPerPage = 9;

  const [product, setproduct] = useState([]);
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };
  return (
    <>
      <br />
      <div>
        <section className="products">
          <div className="container">
            <div className="section-title">
              <h2>Kendini Keşfet</h2>
              <p>Aranan Ürünler</p>
            </div>
            <div className="product-wrapper">
              <div
                style={{
                  gridTemplateColumns: "repeat(auto-fill,minmax(20rem, 1fr)",
                  justifyContent: "center",
                  alignItems: "center",
                  display: "grid",
                  gap: "1rem",
                }}
              >
                {productTypes?.productType?.products.map((productt) => (
                  <ProductCategoryItem
                    productItem={productt}
                    key={productt._id}
                    deg={der}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
        <div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </>
  );
};

export default ProductCategory;
