import React from "react";
import Product from "../Component/Product/Product";
import Sliders from "../Component/Slider/Slider";

const HomePage = () => {
  return (
    <React.Fragment>
      <Sliders />
      <Product />
    </React.Fragment>
  );
};

export default HomePage;
