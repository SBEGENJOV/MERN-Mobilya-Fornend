import { message } from "antd";
import {  useState } from "react";
import { useDispatch } from "react-redux";

const CartCoupon = () => {
  const [couponCode, setCouponCode] = useState("");
  const dispatch = useDispatch();


  const applyCoupon = async () => {
    if (couponCode.trim().length === 0) {
      return message.warning("Boş değer girilimez.");
    }
    try {
      
      dispatch()

      const data = await res.json();
      const discountPercent = data.discountPercent;

      const updatedCartItems = cartItems.map((item) => {
        const updatePrice = item.price * (1 - discountPercent / 100);
        return { ...item, price: updatePrice };
      });

      setCartItems(updatedCartItems);
      setCouponDurum(true);
      message.success(`${couponCode} kupon kodu başarıyla uygulandı.`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="actions-wrapper">
      <div className="coupon">
        <input
          type="text"
          className="input-text"
          placeholder="Kupon Kod"
          onChange={(e) => setCouponCode(e.target.value)}
          value={couponCode}
        />
        {couponDurum ? (
          <button disabled className="btn" type="button" onClick={applyCoupon}>
            Kupon Uygula
          </button>
        ) : (
          <button className="btn" type="button" onClick={applyCoupon}>
           Kupon Uygula
          </button>
        )}
      </div>
    </div>
  );
};

export default CartCoupon;
