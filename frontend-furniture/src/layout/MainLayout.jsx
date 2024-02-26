import { useEffect, useState } from "react";
import Header from "../Component/Layout/Header/Header";
import Footer from "../component/Layout/Footer/Footer";
import Proptypes from "prop-types";
import { useSelector } from "react-redux";
import Search from "../Component/Modals/Search/Search";
import Dialog from "../Component/Modals/Dialog/Dialog";

const MainLayout = ({ children }) => {
  const { error } = useSelector((state) => state?.users);

  const [isSearchShow, setIsSearchShow] = useState(false);
  const [isDialogShow, setIsDialogShow] = useState(false);

  useEffect(() => {
    const dialogStatus = localStorage.getItem("dialog")
      ? JSON.parse(localStorage.getItem("dialog"))
      : localStorage.setItem("dialog", JSON.stringify(true));
    setTimeout(() => {
      setIsDialogShow(dialogStatus);
    }, 2000);
  }, []);
  useEffect(() => {
    if (error?.message === "Token expired/Invalid") {
      localStorage.removeItem("userInfo");
    }
  }, [error?.message]);

  return (
    <div className="main-layout">
      <Dialog isDialogShow={isDialogShow} setIsDialogShow={setIsDialogShow} />
      <Search isSearchShow={isSearchShow} setIsSearchShow={setIsSearchShow} />
      <Header setIsSearchShow={setIsSearchShow} />
      {children}
      <Footer />
    </div>
  );
};

MainLayout.propTypes = {
  children: Proptypes.node,
};

export default MainLayout;
