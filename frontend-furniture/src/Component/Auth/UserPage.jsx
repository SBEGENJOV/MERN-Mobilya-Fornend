import { Button, message } from "antd";
import "./userPage.css";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";

const UserPage = () => {
  const { profile } = useSelector((state) => state?.users);
  const options = { year: "numeric", month: "long", day: "numeric" };
  const kayitDate = new Date(profile?.user?.createdAt).toLocaleDateString(
    "tr-TR",
    options
  );
  return (
    <>
      <div className="userMain">
        <form className="userPageForm">
          <div className="input-group">
            <label>Kullanıcı Adınız:</label>
            <input
              disabled
              value={profile?.user?.username}
              type="text"
              name="name"
              id="name"
            />
          </div>
          <div className="input-group">
            <label>E-posta: </label>
            <input
              disabled
              value={profile?.user?.email}
              type="email"
              name="email"
              id="email"
            />
          </div>
          <div className="input-group">
            <label>Kullanıcı Kayıt Tarihi: </label>
            <input
              disabled
              value={kayitDate}
              type="text"
              name="phone"
              id="phone"
            />
          </div>
          <div className="input-group">
            <label>Kullanıcının Baktıgı Ürün Sayısı: </label>
            <input
              disabled
              value={profile?.user?.productViewrs.length}
              type="text"
              name="phone"
              id="phone"
            />
          </div>
          <div className="input-group">
            <label>Kullanıcının Begendigi Ürün Sayısı: </label>
            <input
              disabled
              value={profile?.user?.likedProduct.length}
              type="text"
              name="phone"
              id="phone"
            />
          </div>
          <div className="input-group">
            <Button
              onClick={() => (
                localStorage.removeItem("userInfo"),
                (window.location.href = "/"),
                window.alert("Başarı ile çıkış yapıldı")
              )}
              style={{ width: "100%" }}
            >
              Çıkış Yap
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default UserPage;
