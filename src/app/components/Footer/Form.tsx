"use client";

import React from "react";
import Form from "next/form";
import { useForm } from "react-hook-form";

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
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormData>();

  const onSubmit = async (formData: FormData) => {
    sendMail(formData);
  };

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      className="footer__form-body form"
      action="/submit"
    >
      <input
        type="text"
        className="form__input"
        placeholder="Имя"
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
        placeholder="Тело письма"
        required
        {...register("message")}
      ></textarea>
      <button
        className="form__button button button--animation"
        disabled={isSubmitting}
      >
        Отправить
      </button>
    </Form>
  );
};

export default FormComponent;
