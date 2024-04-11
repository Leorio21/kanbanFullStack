import React, { ComponentPropsWithoutRef } from "react";
import classNames from "classnames/bind";
import styles from "./Button.module.css";

const cx = classNames.bind(styles);

type ButtonProps = {
  color: string;
  size?: string;
  disable?: boolean;
  width?: string;
} & ComponentPropsWithoutRef<"div">;

function Button({
  color,
  size = "small",
  disable = false,
  width = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <div
      className={cx("container", color, size, {
        disable: disable,
        widthMax: width === "auto",
      })}
      {...props}
    >
      {children}
    </div>
  );
}

export default Button;
