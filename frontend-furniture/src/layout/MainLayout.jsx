import { useEffect } from "react";
import Header from "../Component/Layout/Header/Header";
import Footer from "../component/Layout/Footer/Footer";
import Proptypes from "prop-types";
import { useSelector } from "react-redux";

const MainLayout = ({ children }) => {
  const { error } = useSelector((state) => state?.users);

  useEffect(() => {
    if (error?.message === "Token expired/Invalid") {
      localStorage.removeItem("userInfo");
    }
  }, [error?.message]);

  return (
    <div className="main-layout">
      <Header />
      {children}
      <Footer />
    </div>
  );
};

MainLayout.propTypes = {
  children: Proptypes.node,
};

export default MainLayout;
