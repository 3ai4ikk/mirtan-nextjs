import React from "react";
import Form from "./Form";
import nodemailer from "nodemailer";

type FormData = {
  name: string;
  email: string;
  message: string;
};

const FormComponent = () => {
  const sendMail = async (formData: FormData) => {
    "use server";
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.SMTP_USERNAME,
          pass: process.env.SMTP_PASSWORD,
        },
      });

      const mailOptions = {
        from: formData.name,
        to: process.env.MAIL_RECEIVER_ADDRESS,
        html: `<h1>${formData.name}</h1><h2>Email: ${formData.email}</h2><p>${formData.message}</p>`,
        subject: "Mirtan feedback",
      };

      await transporter.sendMail(mailOptions);
      return {
        success: true,
        error: null,
      };
    } catch {
      return {
        success: false,
        error: "Oops! Error",
      };
    }
  };

  return <Form sendMail={sendMail} />;
};

export default FormComponent;
