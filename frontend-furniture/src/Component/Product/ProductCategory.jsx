import Pagination from "./Pagination";

import ProductCategoryItem from "./ProductCategoryItem";
import "./Product-Item.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { message } from "antd";
import BASE_URL from "../../utils/baseURL";

const ProductCategory = () => {
  const { productTypeId } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const productPerPage = 9;
  const [product, setproduct] = useState([]);
  const [der, setdeg] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/products/productType/${productTypeId}`
        );
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          const startIndex = (currentPage - 1) * productPerPage;
          const secilenProduct = data.slice(
            startIndex,
            startIndex + productPerPage
          );
          setTotalPages(Math.ceil(data.length / productPerPage));
          setproduct(secilenProduct);
        } else {
          message.error("Veri getirme başarısız.");
        }
      } catch (error) {
        console.log("Veri hatası:", error);
      }
    };
    fetchProducts();
    {
      product.length < 1 ? setdeg(false) : setdeg(true);
    }
  }, [productTypeId, product.length, currentPage, productPerPage]);
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };
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
