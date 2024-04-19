"use client";
import React, { useState } from "react";
import { useBoardsStore } from "@/app/Stores/useBoards";
import classNames from "classnames/bind";
import styles from "./Menu.module.css";
import { ElipsisMenu, Item } from "@/app/Components/ElipsisMenu/ElipsisMenu";
import Button from "@/app/Components/Form/Components/Button/Button";
import Delete from "@/app/Components/Delete/Delete";

const cx = classNames.bind(styles);

function Menu() {
  const [isOpenDeleteForm, setIsOpenDeleteForm] = useState(false);
  const activeBoard = useBoardsStore((state) => state.activeBoard);
  const board = useBoardsStore((state) =>
    state.boards.filter((board) => board.id === activeBoard)
  );
  const hasBoardColumns = useBoardsStore(
    (state) =>
      state.columns.filter((column) => column.boardId === activeBoard).length >
      0
  );
  const openTaskForm = useBoardsStore((state) => state.openTaskForm);
  const openBoardForm = useBoardsStore((state) => state.openBoardForm);
  const deleteBoard = useBoardsStore((state) => state.deleteBoard);
  const closeSideBar = useBoardsStore((state) => state.closeSideBar);
  const isSideBarClosed = useBoardsStore((state) => state.isSideBarClosed);

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
      <div className={cx("container")}>
        <p className={cx("title")} onClick={() => closeSideBar(false)}>
          {board[0].name}
          <svg
            className={cx("chevron", {
              rotateChevron: !isSideBarClosed,
            })}
            width="10"
            height="7"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke="#635FC7"
              strokeWidth="2"
              fill="none"
              d="M9 6 5 2 1 6"
            />
          </svg>
        </p>
        <div className={cx("buttonsContainer")}>
          <Button
            color="purple"
            disable={!hasBoardColumns}
            onClick={() => openTaskForm(true, "new")}
          >
            <svg width="12" height="12" xmlns="http://www.w3.org/2000/svg">
              <path
                fill="#FFF"
                d="M7.368 12V7.344H12V4.632H7.368V0H4.656v4.632H0v2.712h4.656V12z"
              />
            </svg>
            &nbsp;
            <span className={styles.buttonContent}>Ajouter une tâche</span>
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
              width="max"
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
