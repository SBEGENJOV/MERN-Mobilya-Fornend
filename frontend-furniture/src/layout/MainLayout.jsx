import Header from "../Component/Layout/Header/Header";
import Footer from "../component/Layout/Footer/Footer";
import Proptypes from "prop-types";

const MainLayout = ({ children }) => {
  return (
    <div className="main-layout">
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default MainLayout;

MainLayout.propTypes = {
  children: Proptypes.node,
};
