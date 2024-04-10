import React from "react";
import classNames from "classnames";
import styles from "./SideBar.module.css";
import ToggleSideBar from "./ToggleSideBar/ToggleSideBar";
import Menu from "./Menu/Menu";

function SideBar() {
  return (
    <div className={classNames(styles.container)}>
      <Menu />
      <ToggleSideBar />
    </div>
  );
}

export default SideBar;
