import { useCallback, useEffect, useState } from "react";
import "./userPage.css";

const UserPage = () => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const [dataSource, setDataSource] = useState({});
  const user = localStorage.getItem("userInfo");
  const deger = JSON.parse(user);
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = new Date(dataSource.createdAt).toLocaleDateString(
    "tr-TR",
    options
  );

  const fetchUsers = useCallback(async () => {
    const response = await fetch(`${apiUrl}/api/users/${deger.id}`);
    if (response.ok) {
      const data = await response.json();
      setDataSource(data);
    }
  }, [apiUrl, deger.id]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);
  return (
    <>
      <div className="userMain">
        <form className="userPageForm">
          <div className="input-group">
            <label>Avatarınız:</label>
            <br></br>
            <img
              src={dataSource.avatar}
              style={{
                marginLeft: "4.3rem",
                width: "10rem",
                height: "10rem",
                borderRadius: "50%",
              }}
            ></img>
          </div>
          <div className="input-group">
            <label>Kullanıcı Adınız:</label>
            <input
              disabled
              value={dataSource.username}
              type="text"
              name="name"
              id="name"
            />
          </div>
          <div className="input-group">
            <label>E-posta: </label>
            <input
              disabled
              value={dataSource.email}
              type="email"
              name="email"
              id="email"
            />
          </div>
          <div className="input-group">
            <label>Kullanıcı Kayıt Tarihi: </label>
            <input
              disabled
              value={formattedDate}
              type="text"
              name="phone"
              id="phone"
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default UserPage;
