import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductAction } from "../Redux/Slices/product/productsSlice";
import ProductDetails from "../Component/ProductDetails/ProductDetails";

const ProductDetailsPage = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state?.products);
  useEffect(() => {
    dispatch(getProductAction(productId));
  }, [dispatch, productId]);

  return products?.status == "Başarılı" ? (
    <ProductDetails />
  ) : (
    <p>Ürün Yükleniyor</p>
  );
};

export default ProductDetailsPage;
