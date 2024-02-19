import "./Policy.css"

export default function Policy() {
  return (
    <section className="policy">
    <div className="container">
      <ul className="policy-list">
        <li className="policy-item">
          <i className="bi bi-truck"></i>
          <div className="policy-texts">
            <strong>Hızlı Ulaştırma</strong>
            <span>Anıında Şifre</span>
          </div>
        </li>
        <li className="policy-item">
          <i className="bi bi-headset"></i>
          <div className="policy-texts">
            <strong>Müşteri Hizmetleri 24/7</strong>
            <span>Online 24 Saat</span>
          </div>
        </li>
        <li className="policy-item">
          <i className="bi bi-arrow-clockwise"></i>
          <div className="policy-texts">
            <strong> 30 Gün Iade</strong>
            <span>30 gün içinde kolay iade</span>
          </div>
        </li>
        <li className="policy-item">
          <i className="bi bi-credit-card"></i>
          <div className="policy-texts">
            <strong> Ödeme Yöntemi</strong>
            <span>Güvenilir Ödeme</span>
          </div>
        </li>
      </ul>
    </div>
  </section>
  )
}
 