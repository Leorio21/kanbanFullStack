import React, { ComponentPropsWithoutRef, PropsWithChildren } from "react";
import classNames from "classnames/bind";
import styles from "./BackDrop.module.css";

const cx = classNames.bind(styles);

type BackDropProps = {
  backdrop?: boolean;
} & ComponentPropsWithoutRef<"div">;

function BackDrop({ backdrop = true, children, ...props }: BackDropProps) {
  return (
    <div className={cx("container", { backdrop: backdrop })} {...props}>
      {children}
    </div>
  );
}

export default BackDrop;
