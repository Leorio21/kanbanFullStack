"use client"
import React from "react";
import classNames from "classnames";
import styles from "./Header.module.css";
import Logo from "./Logo/Logo";

function Header() {

  return (
    <div className={classNames(styles.container)}>
      <Logo />
    </div>
  );
}

export default Header;
