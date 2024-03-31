"use client";
import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./SideBar.module.css";
import ThemeSelector from "./ThemeSelector/ThemeSelector";
import ToggleSideBar from "./ToggleSideBar/ToggleSideBar";
import type { Board } from "@/app/Types/Types";
import boardLogo from "../../../public/assets/icon-board.svg";

const cx = classNames.bind(styles);

type SideBarProps = {
  boards: Board[];
};

function SideBar({ boards }: SideBarProps) {
  const [isOpen, setIsOpen] = useState(true);

  const onClickHandler = () => {
    setIsOpen((current) => !current);
  };

  return (
    <>
      <div className={cx({ container: true, close: !isOpen })}>
        <p>Tous les tableaux ({boards.length})</p>
        <ThemeSelector />
      </div>
      <ToggleSideBar isOpen={isOpen} onClick={() => onClickHandler()} />
    </>
  );
}

export default SideBar;
