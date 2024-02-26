import React, { useEffect } from "react";
import Policy from "../Policy/Policy";
import "./Footer.css";
import { useDispatch, useSelector } from "react-redux";
import { categoryViewAction } from "../../../Redux/Slices/categories/categoriesSlice";

export default function Footer() {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state?.category);
  //dispatch
  useEffect(() => {
    dispatch(categoryViewAction());
  }, [dispatch]);
  return (
    <React.Fragment>
      <Policy />
      <footer className="footer">
        <div className="widgets-row">
          <div className="container">
            <div className="footer-widgets">
              <div className="brand-info">
                <div className="footer-logo">
                  <a href="#" className="logo">
                    <img
                      src="https://img.freepik.com/free-vector/bird-colorful-logo-gradient-vector_343694-1365.jpg?size=338&ext=jpg&ga=GA1.1.1700460183.1708300800&semt=sph"
                      style={{ width: "80px", height: "auto" }}
                      alt="Logo"
                    />
                  </a>
                </div>
                <div className="footer-desc">
                  <p>
                    Türkiye’nin önemli online alışveriş adreslerinden biri olan
                    S_BEGENJOV, 2020 yılında modayı herkes için ulaşılabilir
                    kılmak amacıyla kuruldu. O günden bugüne giyimden aksesuara,
                    ayakkabıdan kozmetiğe kadar pek çok ürünle beğeni kazanmaya
                    devam ediyor. S_BEGENJOV hem farklı zevklere hem de
                    bütçelere hitap eder.
                  </p>
                </div>
                <div className="footer-contact">
                  <p>
                    <a href="tel:555 555 55 55">(+553) 555 55 55</a> –{" "}
                    <a href="mailto:info@example.com">info@gmail.com</a>
                  </p>
                </div>
              </div>
              <div className="widget-nav-menu">
                <h4>Bilgiler</h4>
                <ul className="menu-list">
                  <li>
                    <a href="#">Hakkımızda</a>
                  </li>
                  <li>
                    <a href="#">Kurallar</a>
                  </li>
                  <li>
                    <a href="#">Iade Kuralları</a>
                  </li>
                  <li>
                    <a href="#">Satış Kuralları</a>
                  </li>
                  <li>
                    <a href="#">Parça Satış</a>
                  </li>
                </ul>
              </div>
              <div className="widget-nav-menu">
                <h4>Hesap</h4>
                <ul className="menu-list">
                  <li>
                    <a href="#">Hesap Bilgileri</a>
                  </li>
                  <li>
                    <a href="#">Siparişlerim</a>
                  </li>
                  <li>
                    <a href="#">Ürünlerim</a>
                  </li>
                  <li>
                    <a href="#">Hesap Detayları</a>
                  </li>
                  <li>
                    <a href="#">Siparişleri Tekrarla</a>
                  </li>
                </ul>
              </div>
              <div className="widget-nav-menu">
                <h4>Alışveriş</h4>
                <ul className="menu-list">
                  <li>
                    <a href="#">Öne Çıkanlar</a>
                  </li>
                  <li>
                    <a href="#">En İyiler</a>
                  </li>
                  <li>
                    <a href="#">İndirimliler</a>
                  </li>
                  <li>
                    <a href="#">Son Ürünler</a>
                  </li>
                  <li>
                    <a href="#">Satılan Ürünler</a>
                  </li>
                </ul>
              </div>
              <div className="widget-nav-menu">
                <h4>Kategori</h4>
                <ul className="menu-list">
                  {categories?.categories?.map((category) => (
                    <li key={category._id}>
                      <p>{category.name}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="copyright-row">
          <div className="container">
            <div className="footer-copyright">
              <div className="site-copyright">
                <p>
                  Copyright 2022 © E-Commerce Theme. All right reserved. Powered
                  by Seyitmuhammet BEGENJOV.
                </p>
              </div>
              <a href="#">
                <img src="/img/footer/cards.png" alt="" />
              </a>
              <div className="footer-menu">
                <ul className="footer-menu-list">
                  <li className="list-item">
                    <a href="#">Kurallar</a>
                  </li>
                  <li className="list-item">
                    <a href="#">Sözleşmeler</a>
                  </li>
                  <li className="list-item">
                    <a href="#">KVKK Politikası</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </React.Fragment>
  );
}
