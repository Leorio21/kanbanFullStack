import React, { ComponentPropsWithoutRef, useId } from "react";
import classNames from "classnames/bind";
import styles from "./Input.module.css";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import type { TFormInputs } from "@/app/Types/Types";

const cx = classNames.bind(styles);

type InputProps = {
  register: UseFormRegister<TFormInputs>;
  errors: FieldErrors<TFormInputs>;
  label?: string;
  notNull?: boolean;
  content?: string;
  fieldName: string;
} & ComponentPropsWithoutRef<"input">;

function Input({
  label,
  fieldName,
  register,
  errors,
  notNull = false,
  content = "",
  ...props
}: InputProps) {
  const id = useId();

  if (label) {
    return (
      <label className={cx("label")} htmlFor={id}>
        <span className={cx("title")}>{label}</span>
        <p className={cx("inputContainer")}>
          <input
            className={cx("input", { error: errors[fieldName] })}
            id={id}
            defaultValue={content}
            {...props}
            {...register(fieldName, { required: notNull })}
          />
          {errors[fieldName] && (
            <span className={cx("errorText")}>Ne peut être vide</span>
          )}
        </p>
      </label>
    );
  }
  return (
    <input
      className={cx("input")}
      id={id}
      defaultValue={content}
      {...props}
      {...register(fieldName, { required: notNull })}
    />
  );
}

export default Input;
