import React, { ComponentPropsWithoutRef } from "react";
import classNames from "classnames/bind";
import styles from "./Button.module.css";

const cx = classNames.bind(styles);

type ButtonProps = {
  color: string;
  size?: string;
} & ComponentPropsWithoutRef<"div">;

function Button({ color, size = "small", children, ...props }: ButtonProps) {
  return (
    <div className={cx("container", color, size)} {...props}>
      {children}
    </div>
  );
}

export default Button;
