import React from "react";
import classNames from "classnames/bind";
import styles from "./SubMenu.module.css";
import SubMenuItem from "./SubMenuItem/SubMenuItem";

const cx = classNames.bind(styles);

type SubMenuProps = {
  menuIsOpen: boolean;
}

function SubMenu({menuIsOpen}: SubMenuProps) {
  return (
    <div className={cx("container", {hide: !menuIsOpen})}>
      <SubMenuItem>Modifer tableau</SubMenuItem>
      <SubMenuItem type="delete">Supprimer tableau</SubMenuItem>
    </div>
  );
}

export default SubMenu;
