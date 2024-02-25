import "./Cart.css";
//import CartCoupon from "./CartCoupon";
//import CartProgress from "./CartProgress";
import CartTable from "./CartTable";
import CartTotals from "./CartTotals";

const Cart = () => {
  const cartItems = JSON.parse(localStorage.getItem("furnitureItems"));
  return (
    <section className="cart-page">
      <div className="container">
        {cartItems.length > 0 ? (
          <div className="cart-page-wrapper">
            <form className="cart-form">
              {/* <CartProgress /> */}
              <div className="shop-table-wrapper">
                <CartTable />
                 {/* <CartCoupon />  */}
              </div>
            </form>
            <div className="cart-collaterals"><CartTotals /></div>
          </div>
        ) : (
          <h2>Sepetde Ürün Yok</h2>
        )}
      </div>
    </section>
  );
};

export default Cart;
