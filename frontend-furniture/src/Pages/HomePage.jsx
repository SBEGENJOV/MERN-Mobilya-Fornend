import React from "react";
import Product from "../Component/Product/Product";
import Sliders from "../Component/Slider/Slider";
import Campaigns from "../Component/Campaigns/Campaigns";
import Blogs from "../Component/Blog/Blog";

const HomePage = () => {
  return (
    <React.Fragment>
      <Sliders />
      <Product />
      <Campaigns />
      <Blogs />
    </React.Fragment>
  );
};

export default HomePage;
