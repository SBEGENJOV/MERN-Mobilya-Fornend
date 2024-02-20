import React from "react";
import Product from "../Component/Product/Product";
import Sliders from "../Component/Slider/Slider";
import Campaigns from "../Component/Campaigns/Campaigns";

const HomePage = () => {
  return (
    <React.Fragment>
      <Sliders />
      <Product />
      <Campaigns />
    </React.Fragment>
  );
};

export default HomePage;
