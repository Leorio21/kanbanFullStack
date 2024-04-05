import React from "react";
import { useBoardsStore } from "@/app/Stores/useBoards";
import classNames from "classnames";
import styles from "./Menu.module.css";
import { ElipsisMenu, Item } from "@/app/Components/ElipsisMenu/ElipsisMenu";
import Button from "@/app/Components/Button/Button";

function Menu() {
  const activeBoard = useBoardsStore((state) => state.activeBoard);

  if (activeBoard) {
    return (
      <div className={classNames(styles.container)}>
        <p className={classNames(styles.title)}>{activeBoard.name}</p>
        <div className={classNames(styles.buttonContainer)}>
          <Button
            color="purple"
            size="medium"
            disable={activeBoard?.columns.length === 0}
          >
            + Ajouter une tâche
          </Button>
          <ElipsisMenu position="board">
            <Item>Modifer tableau</Item>
            <Item type="delete">Supprimer tableau</Item>
          </ElipsisMenu>
        </div>
      </div>
    );
  }
}

export default Menu;
