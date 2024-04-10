import React from "react";
import classNames from "classnames/bind";
import styles from "./Menu.module.css";
import { useBoardsStore } from "@/app/Stores/useBoards";
import BoardList from "../BoardList/BoardList";
import ThemeSelector from "../ThemeSelector/ThemeSelector";

const cx = classNames.bind(styles);

function Menu() {
  const nbBoards = useBoardsStore((state) => state.boards.length);
  const sideBardIsClose = useBoardsStore((state) => state.sideBarIsCLosed);

  return (
    <div className={cx({ container: true, close: sideBardIsClose })}>
      <div className={cx("boardListContainer")}>
        <p className={cx("boardListTitle")}>Tous les tableaux ({nbBoards})</p>
        <BoardList />
      </div>
      <ThemeSelector />
    </div>
  );
}

export default Menu;
