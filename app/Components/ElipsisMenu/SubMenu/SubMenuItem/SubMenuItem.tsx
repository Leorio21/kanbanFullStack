import React, { ComponentPropsWithoutRef } from "react";
import classNames from "classnames/bind";
import styles from "./SubMenuItem.module.css";

const cx = classNames.bind(styles);

type SubMenuItemProps = {
  type?: string;
} & ComponentPropsWithoutRef<"div">;

function SubMenuItem({
  children,
  type = "standard",
  ...props
}: SubMenuItemProps) {
  return (
    <div className={cx("link", type)} {...props}>
      {children}
    </div>
  );
}

export default SubMenuItem;
