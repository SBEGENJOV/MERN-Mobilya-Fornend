import { useState } from "react";
import { Spin, message } from "antd";
import { loadStripe } from "@stripe/stripe-js";
import BASE_URL from "../../utils/baseURL";

const stripePublicKey = import.meta.env.VITE_API_STRIPE_PUBLIC_KEY;
const user = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const CartTotals = () => {
  const [fastCargoCheched, setFastCargoCheched] = useState(false);
  const [loading, setLoading] = useState(false);
  const cartItemTotals = JSON.parse(localStorage.getItem("furnitureItems")).map(
    (item) => {
      const itemTotal = item.price * item.quantity;

      return itemTotal;
    }
  );
  const subTotals = cartItemTotals.reduce((previousValue, currentValue) => {
    return previousValue + currentValue;
  }, 0);

  const cargoFee = 15;

  const cartTotals = fastCargoCheched
    ? (subTotals + cargoFee).toFixed(2)
    : subTotals.toFixed(2);

  const handlePayment = async () => {
    setLoading(true);
    if (!user) {
      return message.info("Ödeme yapabilmek için giriş yapmalısınız!");
    }

    const body = {
      products: JSON.parse(localStorage.getItem("furnitureItems")),
      user: user,
      cargoFee: fastCargoCheched ? cargoFee : 0,
    };
    try {
      const stripe = await loadStripe(stripePublicKey);

      const res = await fetch(`${BASE_URL}/payment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        return message.error("Ödeme işlemi başarısız oldu.");
      }

      const session = await res.json();

      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        throw new Error(result.error.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cart-totals">
      <h2>Toplan Ürün</h2>
      <table>
        <tbody>
          <tr className="cart-subtotal">
            <th>Toplam Maliyet</th>
            <td>
              <span id="subtotal">${subTotals.toFixed(2)}</span>
            </td>
          </tr>
          <tr>
            <th>Ek Özellik</th>
            <td>
              <ul>
                <li>
                  <label>
                    Hızlı Kargo: $15.00
                    <input
                      type="checkbox"
                      id="fast-cargo"
                      checked={fastCargoCheched}
                      onChange={() => {
                        setFastCargoCheched(!fastCargoCheched);
                      }}
                    />
                  </label>
                </li>
                {/* <li>
                  <a href="#">Change Address</a>
                </li> */}
              </ul>
            </td>
          </tr>
          <tr>
            <th>Toplam</th>
            <td>
              <strong id="cart-total">${cartTotals}</strong>
            </td>
          </tr>
        </tbody>
      </table>
      <div className="checkout">
        <Spin spinning={loading}>
          <button className="btn btn-lg" onClick={handlePayment}>
            Sipariş Ver
          </button>
        </Spin>
      </div>
    </div>
  );
};

export default CartTotals;
