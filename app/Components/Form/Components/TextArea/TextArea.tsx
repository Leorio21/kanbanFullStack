import React, { ComponentPropsWithoutRef, useId, useState } from "react";
import classNames from "classnames";
import styles from "./TextArea.module.css";

type TextAreaProps = {
  label: string;
  content?: string;
} & ComponentPropsWithoutRef<"textarea">;

function TextArea({ label, content, ...props }: TextAreaProps) {
  const id = useId();
  const [inputValue, setInputValue] = useState(content);

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(() => event.target.value);
  };

  return (
    <label className={classNames(styles.label)} htmlFor={id}>
      <span className={classNames(styles.title)}>{label}</span>
      <textarea
        className={classNames(styles.textArea)}
        id={id}
        {...props}
        onChange={() => onChangeHandler}
      ></textarea>
    </label>
  );
}

export default TextArea;
