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

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const productPerPage = 9;
  const [product, setproduct] = useState([]);
  const [der, setdeg] = useState(false);

  const { productTypes } = useSelector((state) => state?.productTypes);

  useEffect(() => {
    dispatch(getProductTypeAction(productTypeId));
  }, [dispatch, productTypeId]);

  useEffect(() => {
    const page = async () => {
      if (productTypes?.status === "Başarılı") {
        const startIndex = (currentPage - 1) * productPerPage;
        const secilenProduct = productTypes?.productType?.products.slice(
          startIndex,
          startIndex + productPerPage
        );
        setTotalPages(
          Math.ceil(productTypes?.productType?.products.length / productPerPage)
        );
        setproduct(secilenProduct);
      }
    };
    page();
    product.length < 1 ? setdeg(false) : setdeg(true);
  }, [
    currentPage,
    productTypes?.productType?.products,
    productTypes?.status,
    product.length,
  ]);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };
  console.log(product);
  return (
    <>
      {der ? (
        <div>
          <br />
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
                  {product.map((productt) => (
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
      ) : (
        <h2>Görüntülencek Ürün Yok</h2>
      )}
    </>
  );
};

export default ProductCategory;
