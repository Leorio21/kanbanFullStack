import React, { ComponentPropsWithoutRef } from "react";
import classNames from "classnames/bind";
import styles from "./SubMenu.module.css";
import SubMenuItem from "./SubMenuItem/SubMenuItem";

const cx = classNames.bind(styles);

type SubMenuProps = {
  menuIsOpen: boolean;
} & ComponentPropsWithoutRef<"div">;

function SubMenu({ menuIsOpen, children }: SubMenuProps) {
  return (
    <div className={cx("container", { hide: !menuIsOpen })}>{children}</div>
  );
}

export default SubMenu;
