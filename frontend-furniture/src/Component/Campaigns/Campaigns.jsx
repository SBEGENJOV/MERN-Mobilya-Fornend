import CampaignItem from "./CampaignsItem";
import "./Campaigns.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { campainViewAction } from "../../Redux/Slices/campains/campainsSlice";

const Campaigns = () => {
  const dispatch = useDispatch();
  const { campains } = useSelector((state) => state?.campains);
  console.log(campains);
  useEffect(() => {
    dispatch(campainViewAction());
  }, [dispatch]);
  const firstThreeBlogs = campains.slice(-3);
  return (
    <section className="campaigns">
      <div className="container">
        <div className="campaigns-wrapper">
          {firstThreeBlogs.map((campaign) => (
            <CampaignItem campainItem={campaign} key={campaign._id} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Campaigns;
