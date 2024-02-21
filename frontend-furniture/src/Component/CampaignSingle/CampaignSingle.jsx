import "./CampaignSingle.css";

const CampaignSingle = () => {
  return (
    <section className="campaign-single">
      <div className="container">
        <div className="campaign-wrapper">
          <h2>Yeni Sezon İndirimi</h2>
          <strong>40%</strong>
          <span></span>
          <a href="#" className="btn btn-lg">
            Şimdi Alış Veriş Yap
            <i className="bi bi-arrow-right"></i>
          </a>
        </div>
      </div>
    </section>
  );
};

export default CampaignSingle;
