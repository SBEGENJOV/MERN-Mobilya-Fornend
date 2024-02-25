import { Link } from "react-router-dom";
import "./CampaignsItem.css";
import PropTypes from "prop-types";

const CampaignItem = ({ campainItem }) => {
  const maxLength = 80; // Maksimum karakter uzunluğu

  let descText = campainItem.desc;
  if (descText.length > maxLength) {
    descText = descText.substring(0, maxLength) + "..."; // İlgili kısmı al ve üç nokta ekle
  }
  const divStyle = {
    backgroundImage: `url(${campainItem.img})`,
  };
  return (
    <div style={divStyle} className="campaign-item">
      <h3 className="campaign-title">{campainItem.title}</h3>
      <p className="campaign-desc">{descText}</p>
      <a href={`/campain/${campainItem._id}`} className="btn btn-primary">
        Devamı İçin Tıkla
      </a>
    </div>
  );
};

export default CampaignItem;
CampaignItem.propTypes = {
  campainItem: PropTypes.object,
};
