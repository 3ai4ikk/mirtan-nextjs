import Link from "next/link";
import React from "react";
import Form from "next/form";

import "./footer.scss";
import "@/styles/components/button.scss";
import "@/styles/components/form.scss";
import { products } from "../products";

const Footer = () => {
  return (
    <footer className="footer section">
      <div className="footer__inner container">
        <div className="footer__logo">
          <Link className="footer__logo-link" href="/"></Link>
        </div>

        <div className="footer__products">
          <h4 className="footer__title">Наша продукция</h4>
          <div className="footer__products-body">
            <ul className="footer__products-list">
              {products.map(({ title, link }, index) => (
                <li className="footer__products-item" key={index}>
                  <Link className="footer__products-link" href={link}>
                    {title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="footer__contacts">
          <h4 className="footer__title">Наши контакты</h4>
          <div className="footer__contacts-body">
            <div className="footer__contacts-address">
              <address>
                Ova mahallesi 44346 sokak <br />
                No. 2/5 Seyhan Adana Turkiye
              </address>
            </div>
            <div className="footer__contacts-tel">
              <div>
                <Link
                  className="footer__contacts-tel-link"
                  href="tel:+905417121077"
                >
                  +90 541-712-10-77
                </Link>
                <Link
                  className="footer__contacts-tel-link"
                  href="tel:+905525284533"
                >
                  +90 552-528-45-33
                </Link>
              </div>
            </div>
            <div className="footer__contacts-email">
              <Link
                className="footer__contacts-email-link"
                href="mailto:info@mirtantarim.com"
              >
                info@mirtantarim.com
              </Link>
            </div>
          </div>
        </div>
        <div className="footer__form">
          <h4 className="footer__title">Напишите нам</h4>
          <Form className="footer__form-body form" action="/submit">
            <input
              type="text"
              className="form__input"
              placeholder="Имя"
              required
            />
            <input
              type="email"
              className="form__input"
              placeholder="Email"
              required
            />
            <textarea
              className="form__text-area"
              placeholder="Тело письма"
              required
            ></textarea>
            <button className="form__button button button--animation">
              Отправить
            </button>
          </Form>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
