import React from "react";
import classNames from "classnames";
import styles from "./Menu.module.css";
import { useBoardsStore } from "@/app/Stores/useBoards";
import BoardList from "../BoardList/BoardList";
import ThemeSelector from "../ThemeSelector/ThemeSelector";

function Menu() {
  const nbBoards = useBoardsStore((state) => state.boards.length);

  return (
    <div className={classNames(styles.container)}>
      <div className={classNames(styles.boardListContainer)}>
        <p className={classNames(styles.boardListTitle)}>
          Tous les tableaux ({nbBoards})
        </p>
        <BoardList />
      </div>
      <ThemeSelector />
    </div>
  );
}

export default Menu;
