import { Button, Result } from "antd";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const Success = () => {
  useEffect(() => {
    localStorage.removeItem("furnitureItems");
  }, []);

  return (
    <div className="success-page">
      <div className="container">
        <Result
          status="success"
          title="Ödeme Başarılı!"
          subTitle="Siparişiniz başarıyla tamamlandı"
          extra={[
            <a href={"/"} key="home">
              <Button type="primary">Ana Sayfa</Button>,
            </a>,
          ]}
        />
      </div>
    </div>
  );
};

export default Success;
