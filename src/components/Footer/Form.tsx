"use client";

import React, { useState } from "react";
import Form from "next/form";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";

type FormData = {
  name: string;
  email: string;
  message: string;
};

const FormComponent = ({
  sendMail,
}: {
  sendMail: (formData: FormData) => void;
}) => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormData>();

  const [success, setSuccess] = useState(false);

  const onSubmit = async (formData: FormData) => {
    sendMail(formData);
    reset();
    setSuccess(true);

    setTimeout(() => {
      setSuccess(false);
    }, 3000);
  };

  const t = useTranslations("Footer");

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      className="footer__form-body form"
      action={""}
    >
      <input
        type="text"
        className="form__input"
        placeholder={t.raw("form")[0]}
        required
        {...register("name")}
      />
      <input
        type="email"
        className="form__input"
        placeholder="Email"
        required
        {...register("email")}
      />
      <textarea
        className="form__text-area"
        placeholder={t.raw("form")[1]}
        required
        {...register("message")}
      ></textarea>
      <button
        className="form__button button button--animation"
        disabled={isSubmitting}
      >
        {t("button")}
      </button>

      <div className={`form__announcement ${success ? "active" : ""}`}>
        {t.raw("form")[2]}
      </div>
    </Form>
  );
};

export default FormComponent;
