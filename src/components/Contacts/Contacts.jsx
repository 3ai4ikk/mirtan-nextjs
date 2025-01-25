import { Link } from "@/i18n/routing";
import React from "react";

import "./contacts.scss";
import { useLocale, useTranslations } from "next-intl";

const ContactsMain = ({ className = "" }) => {
  const t = useTranslations("Contacts");

  const locale = useLocale();

  return (
    <section className={`contacts section ${className}`}>
      <div className="contacts__inner container">
        <div className="contacts__body">
          <h3 className="contacts__title">{t("title")}</h3>
          <div className="contacts__info">
            <address className="contacts__info-address">
              Ova mahallesi 44346 sokak. <br />
              No. 2/5 Seyhan Adana Turkiye
            </address>
            <div className="contacts__info-telephone">
              <div>
                <Link
                  className="contacts__info-telephone-link"
                  href="tel:+905417121077"
                >
                  +90 541-712-10-77
                </Link>
                <Link
                  className="contacts__info-telephone-link"
                  href="tel:+905525284533"
                >
                  +90 552-528-45-33
                </Link>
              </div>
            </div>
            <div className="contacts__info-email">
              <Link
                className="contacts__info-email-link"
                href="mailto:info@mirtantarim.com"
              >
                info@mirtantarim.com
              </Link>
            </div>
          </div>
        </div>
        <iframe
          src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3187.18107124717!2d35.258745076302574!3d36.98161085745176!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1528864b7425175b%3A0xe07ff7cf75dd97f9!2sMirtan!5e0!3m2!1s${locale}!2s${locale}!4v1735910418872!5m2!1s${locale}!2s${locale}`}
          width="600"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </section>
  );
};

export default ContactsMain;
