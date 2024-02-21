import React from "react";
import Product from "../Component/Product/Product";
import Sliders from "../Component/Slider/Slider";
import Campaigns from "../Component/Campaigns/Campaigns";
import Blogs from "../Component/Blog/Blog";
import Brands from "../Component/Brands/Brands";
import CampaignSingle from "../Component/CampaignSingle/CampaignSingle";

const HomePage = () => {
  return (
    <React.Fragment>
      <Sliders />
      <Product />
      <Campaigns />
      <Blogs />
      <Brands />
      <CampaignSingle />
    </React.Fragment>
  );
};

export default HomePage;
