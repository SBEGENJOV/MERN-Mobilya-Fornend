//import Breadcrumb from "./Breadcrumb/breadcrumb";
import { useParams } from "react-router-dom";
import Gallery from "./Gallery/Gallery";
import Info from "./Info/Info";
import "./ProductDetails.css";
//import Tabs from "./Tabs/Tabs";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getProductAction } from "../../Redux/Slices/product/productsSlice";

const ProductDetails = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state?.products);
  useEffect(() => {
    dispatch(getProductAction(productId));
  }, [dispatch, productId]);

  return (
    <section className="single-product">
      <div className="container">
        <div className="single-product-wrapper">
          {/* <Breadcrumb /> */}
          <div className="single-content">
            <main className="site-main">
              <Gallery singleProduct={products} />
               <Info singleProduct={products} />
            </main>
          </div>
          {/* <Tabs singleProduct={products} setSingleProduct={products} /> */}
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;

ProductDetails.propTypes = {
  singleProduct: PropTypes.object,
  setSingleProduct: PropTypes.func,
};
