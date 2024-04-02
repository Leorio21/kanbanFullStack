"use client";
import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./SideBar.module.css";
import ThemeSelector from "./ThemeSelector/ThemeSelector";
import ToggleSideBar from "./ToggleSideBar/ToggleSideBar";
import BoardList from "./BoardList/BoardList";
import { useBoardsStore } from "@/app/Stores/useBoards";

const cx = classNames.bind(styles);

function SideBar() {
  const boards = useBoardsStore((state) => state.boards);
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
          <BoardList />
        </div>
        <ThemeSelector />
      </div>
      <ToggleSideBar isOpen={isOpen} onClick={() => onClickHandler()} />
    </>
  );
}

export default SideBar;
