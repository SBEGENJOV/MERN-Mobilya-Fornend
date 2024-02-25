import CartItem from "./CartItem";

const CartTable = () => {
  const cartItems = JSON.parse(localStorage.getItem("furnitureItems"));
  //console.log(JSON.parse(cartItems));
  return (
    <table className="shop-table">
      <thead>
        <tr>
          <th className="product-thumbnail">&nbsp;</th>
          <th className="product-thumbnail">&nbsp;</th>
          <th className="product-name">Ürün</th>
          <th className="product-price">Fiyat</th>
          <th className="product-quantity">Adet</th>
          <th className="product-subtotal">Toplam Tutar</th>
        </tr>
      </thead>
      <tbody className="cart-wrapper">
        {cartItems.map((item) => (
          <CartItem cartItem={item} key={item._id} />
        ))}
      </tbody>
    </table>
  );
};

export default CartTable;
