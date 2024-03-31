"use client";
import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./SideBar.module.css";
import ThemeSelector from "./ThemeSelector/ThemeSelector";
import ToggleSideBar from "./ToggleSideBar/ToggleSideBar";
import type { Board } from "@/app/Types/Types";
import BoardList from "./BoardList/BoardList";

const cx = classNames.bind(styles);

type SideBarProps = {
  boards: Board[];
  activeBoard: Board;
  changeActiveBoard: (newBoard: Board) => void;
};

function SideBar({ boards, activeBoard, changeActiveBoard }: SideBarProps) {
  const [isOpen, setIsOpen] = useState(true);

  const onClickHandler = () => {
    setIsOpen((current) => !current);
  };

  return (
    <>
      <div className={cx({ container: true, close: !isOpen })}>
        <div className={cx("boardListContainer")}>
          <p className={cx("boardListTitle")}>
            Tous les tableaux ({boards.length})
          </p>
          <BoardList boards={boards} activeBoard={activeBoard} changeActiveBoard={changeActiveBoard} />
        </div>
        <ThemeSelector />
      </div>
      <ToggleSideBar isOpen={isOpen} onClick={() => onClickHandler()} />
    </>
  );
}

export default SideBar;
