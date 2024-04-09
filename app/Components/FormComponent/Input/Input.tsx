import React, { ComponentPropsWithoutRef, useId } from "react";
import classNames from "classnames";
import styles from "./Input.module.css";

type InputProps = {
  label?: string;
} & ComponentPropsWithoutRef<"input">;

function Input({ label, ...props }: InputProps) {
  const id = useId();

  if (label) {
    return (
      <label className={classNames(styles.label)} htmlFor={id}>
        <span className={classNames(styles.title)}>{label}</span>
        <input className={classNames(styles.input)} id={id} {...props} />
      </label>
    );
  }
  return <input className={classNames(styles.input)} id={id} {...props} />;
}

export default Input;
