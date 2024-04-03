import React from "react";
import { useBoardsStore } from "@/app/Stores/useBoards";
import classNames from "classnames";
import styles from "./Menu.module.css";
import Options from "./Options/Options";

function Menu() {
  const board = useBoardsStore((state) => state.activeBoard);

  if (board) {
    return (
      <div className={classNames(styles.container)}>
        <p className={classNames(styles.title)}>{board.name}</p>
        <Options />
      </div>
    );
  }
}

export default Menu;
