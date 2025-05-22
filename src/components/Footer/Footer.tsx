import { Link } from "@/i18n/navigation";
import React from "react";
import FormComponent from "./FormComponent";

import "./footer.scss";
import "@/app/styles/components/button.scss";
import "@/app/styles/components/form.scss";
import { getProductsItems } from "../products";
import { useTranslations } from "next-intl";

const Footer = () => {
  const tProducts = useTranslations("Products");
  const tFooter = useTranslations("Footer");

  const footerHeaders = tFooter.raw("title");

  return (
    <footer className="footer section">
      <div className="footer__inner container">
        <div className="footer__logo">
          <Link className="footer__logo-link" href="/"></Link>
        </div>

        <div className="footer__products">
          <h4 className="footer__title">{footerHeaders[0]}</h4>
          <div className="footer__products-body">
            <ul className="footer__products-list">
              {getProductsItems(tProducts).map(({ title, link }, index) => (
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
          <h4 className="footer__title">{footerHeaders[1]}</h4>
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
          <h4 className="footer__title">{footerHeaders[2]}</h4>
          <FormComponent />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
