import React from "react";
import classNames from "classnames";
import styles from "./Board.module.css";
import Header from "./Header/Header";
import SideBar from "../SideBar/SideBar";
import Content from "./Content/Content";
import FormBoard from "../FormBoard/FormBoard";
import FormTask from "../FormTask/FormTask";
import { useBoardsStore } from "@/app/Stores/useBoards";

function Board() {
  const displayBoardForm = useBoardsStore((state) => state.displayBoardForm);
  const displayTaskForm = useBoardsStore((state) => state.displayTaskForm);
  const activeBoard = useBoardsStore((state) => state.activeBoard);

  return (
    <>
      <div className={classNames(styles.container)}>
        <Header />
        <div className={classNames(styles.content)}>
          <SideBar />
          <Content />
        </div>
      </div>
      {displayBoardForm.isOpen && displayBoardForm.type === "new" && (
        <FormBoard />
      )}
      {displayBoardForm.isOpen &&
        displayBoardForm.type === "modify" &&
        activeBoard && <FormBoard boardId={activeBoard} />}
      {displayTaskForm && <FormTask />}
    </>
  );
}

export default Board;
