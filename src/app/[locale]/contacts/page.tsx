import React from "react";
import ContactsComponent from "../../../components/Contacts/Contacts";

import "./contacs.scss";
import {Metadata} from "next";
import {getTranslations} from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Metadata");
  return {
    title: "Mirtan | " + t("Titles.contacts"),
    description: t("Descriptions.contacts"),
  };
}

const Contacts = () => {
  return <ContactsComponent className="contacts" />;
};

export default Contacts;
