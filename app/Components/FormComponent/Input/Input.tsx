import React, { ComponentPropsWithoutRef, useId, useState } from "react";
import classNames from "classnames";
import styles from "./Input.module.css";

type InputProps = {
  label?: string;
  content?: string;
} & ComponentPropsWithoutRef<"input">;

function Input({ label, content = "", ...props }: InputProps) {
  const id = useId();
  const [inputValue, setInputValue] = useState(content);

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(() => event.target.value);
  };

  if (label) {
    return (
      <label className={classNames(styles.label)} htmlFor={id}>
        <span className={classNames(styles.title)}>{label}</span>
        <input
          className={classNames(styles.input)}
          id={id}
          value={inputValue}
          {...props}
          onChange={onChangeHandler}
        />
      </label>
    );
  }
  return (
    <input
      className={classNames(styles.input)}
      id={id}
      value={inputValue}
      {...props}
      onChange={onChangeHandler}
    />
  );
}

export default Input;
