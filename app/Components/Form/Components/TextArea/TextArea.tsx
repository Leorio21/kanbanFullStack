import React, { ComponentPropsWithoutRef, useId, useState } from "react";
import classNames from "classnames";
import styles from "./TextArea.module.css";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import type { FormInputs } from "@/app/Types/Types";

type TextAreaProps = {
  register: UseFormRegister<FormInputs>;
  errors: FieldErrors<FormInputs>;
  label: string;
  fieldName: string;
  content?: string;
} & ComponentPropsWithoutRef<"textarea">;

function TextArea({
  register,
  fieldName,
  label,
  content,
  ...props
}: TextAreaProps) {
  const id = useId();

  return (
    <label className={classNames(styles.label)} htmlFor={id}>
      <span className={classNames(styles.title)}>{label}</span>
      <textarea
        className={classNames(styles.textArea)}
        id={id}
        defaultValue={content}
        {...props}
        {...register(fieldName)}
      ></textarea>
    </label>
  );
}

export default TextArea;
