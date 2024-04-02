"use client"
import React from "react";
import classNames from "classnames";
import styles from "./Header.module.css";
import Logo from "./Logo/Logo";
import Menu from "./Menu/Menu";

function Header() {

  return (
    <div className={classNames(styles.container)}>
      <Logo />
      <Menu />
    </div>
  );
}

export default Header;
