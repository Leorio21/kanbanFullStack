"use client";
import React, { useState } from "react";
import { useBoardsStore } from "@/app/Stores/useBoards";
import classNames from "classnames";
import styles from "./Menu.module.css";
import { ElipsisMenu, Item } from "@/app/Components/ElipsisMenu/ElipsisMenu";
import Button from "@/app/Components/Form/Components/Button/Button";
import Delete from "@/app/Components/Delete/Delete";

function Menu() {
  const [isOpenDeleteForm, setIsOpenDeleteForm] = useState(false);
  const activeBoard = useBoardsStore((state) => state.activeBoard);
  const board = useBoardsStore((state) =>
    state.boards.filter((board) => board.id === activeBoard)
  );
  const boardHasColumns = useBoardsStore(
    (state) =>
      state.columns.filter((column) => column.boardId === activeBoard).length >
      0
  );
  const openTaskForm = useBoardsStore((state) => state.openTaskForm);
  const openBoardForm = useBoardsStore((state) => state.openBoardForm);
  const deleteBoard = useBoardsStore((state) => state.deleteBoard);

  const openDeleteForm = (newValue: boolean) => {
    setIsOpenDeleteForm(newValue);
  };

  const onDeleteHandler = () => {
    if (activeBoard !== null) {
      deleteBoard();
      openDeleteForm(false);
    }
  };

  if (activeBoard !== null) {
    return (
      <div className={classNames(styles.container)}>
        <p className={classNames(styles.title)}>{board[0].name}</p>
        <div className={classNames(styles.buttonsContainer)}>
          <Button
            color="purple"
            size="medium"
            disable={!boardHasColumns}
            onClick={() => openTaskForm(true, "new")}
          >
            + Ajouter une tâche
          </Button>
          <ElipsisMenu position="board">
            <Item onClick={() => openBoardForm(true, "modify")}>
              Modifer tableau
            </Item>
            <Item type="delete" onClick={() => openDeleteForm(true)}>
              Supprimer tableau
            </Item>
          </ElipsisMenu>
        </div>
        {isOpenDeleteForm && (
          <Delete type="board" name={board[0].name}>
            <Button
              color="red"
              size="medium"
              width="max"
              onClick={onDeleteHandler}
            >
              Supprimer
            </Button>
            <Button
              color="white"
              size="medium"
              width="auto"
              onClick={() => openDeleteForm(false)}
            >
              Annuler
            </Button>
          </Delete>
        )}
      </div>
    );
  }
}

export default Menu;
