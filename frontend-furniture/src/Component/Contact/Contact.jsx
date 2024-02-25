import { useEffect, useState } from "react";
import "./Contact.css";
import { useDispatch, useSelector } from "react-redux";
import { addContactAction } from "../../Redux/Slices/contact/contactSlice";

import ErrorMsg from "../Alert/ErrorMsg";
import SuccesMsg from "../Alert/SuccesMsg";
import { useNavigate } from "react-router-dom";

const Contact = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { contacts } = useSelector((state) => state?.contacts);

  const [formData, setFormData] = useState({
    name: "",
    mail: "",
    subject: "",
    content: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleContact = async (e) => {
    e.preventDefault();
    dispatch(
      addContactAction({
        name: formData.name,
        mail: formData.mail,
        subject: formData?.subject,
        content: formData?.content,
      }),
      setFormData({
        email: "",
        password: "",
        username: "",
      })
    );
  };

  useEffect(() => {
    if (contacts?.status === "Başarılı") {
      navigate("/");
    }
  }, [contacts?.status, navigate]);
  return (
    <section className="contact">
      <div className="contact-top">
        <div className="contact-map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3008.9633698339308!2d28.929441087738052!3d41.04793012296828!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab1d021adf417%3A0xba3a3fdfdbb5f5d!2sEy%C3%BCp%20Sultan%20Camii!5e0!3m2!1str!2str!4v1665091191675!5m2!1str!2str"
            width="100%"
            height="500"
            style={{
              border: "0",
            }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
      <div className="contact-bottom">
        {contacts?.error && <ErrorMsg message={contacts?.error?.message} />}
        {contacts?.status === "Başarılı" && (
          <SuccesMsg message="İşlem Başarılı" />
        )}
        <div className="container">
          <div className="contact-titles">
            <h4>Bizimle iletişime geçin</h4>
            <h2>Sorunu Bildir</h2>
            <p>
              Birbirimizi dinlemek ve anlamak, her birimizin kendi benzersiz
              sesini duyurmasına olanak tanır. İletişim kurarken anlayış, saygı
              ve empatiyle birbirimize yaklaşmak, güçlü ve anlamlı ilişkiler
              kurmamızı sağlar.
            </p>
          </div>
          <div className="contact-elements">
            <form className="contact-form" onSubmit={handleContact}>
              <div className="">
                <label>
                  İsminiz:
                  <span>*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  onChange={handleInputChange}
                />
              </div>
              <div className="">
                <label>
                  Mailiniz:
                  <span>*</span>
                </label>
                <input
                  type="text"
                  name="mail"
                  required
                  onChange={handleInputChange}
                />
              </div>
              <div className="">
                <label>
                  Konu
                  <span>*</span>
                </label>
                <input
                  type="text"
                  name="subject"
                  required
                  onChange={handleInputChange}
                />
              </div>
              <div className="">
                <label>
                  İçerik:
                  <span>*</span>
                </label>
                <textarea
                  id="author"
                  name="content"
                  type="text"
                  defaultValue=""
                  size="30"
                  maxLength={300}
                  required=""
                  onChange={handleInputChange}
                ></textarea>
              </div>
              <button className="btn btn-sm form-button">Yolla</button>
            </form>
            <div className="contact-info">
              <div className="contact-info-item">
                <div className="contact-info-texts">
                  <strong> Adresimiz</strong>
                  <p className="contact-street">
                    Clotya Store Germany — 785 15h Street, Office 478/B Green
                    Mall Berlin, De 81566
                  </p>
                  <a href="tel:Phone: +1 1234 567 88">Numara: +555 555 55 55</a>
                  <a href="mailto:Email: contact@example.com">
                    Email: iletişim@gmail.com
                  </a>
                </div>
              </div>
              <div className="contact-info-item">
                <div className="contact-info-texts">
                  <strong>Açık Oldugumuz Saatler</strong>
                  <p className="contact-date">
                    Pazartesi - Cuma : Sabah:9 - Akşam-5
                  </p>
                  <p>Hatfa Sonu Kapalı</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
