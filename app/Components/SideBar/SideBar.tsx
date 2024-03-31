"use client";
import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./SideBar.module.css";
import ThemeSelector from "./ThemeSelector/ThemeSelector";
import ToggleSideBar from "./ToggleSideBar/ToggleSideBar";

const cx = classNames.bind(styles);

function SideBar() {
  const [isOpen, setIsOpen] = useState(false);

  const onClickHandler = () => {
    setIsOpen((current) => !current);
  };

  return (
    <>
      <div className={cx({ container: true, close: isOpen })}>
        <p>Tous les tableaux (10)</p>
        <ThemeSelector />
      </div>
      <ToggleSideBar isOpen={isOpen} onClick={() => onClickHandler()} />
    </>
  );
}

export default SideBar;
