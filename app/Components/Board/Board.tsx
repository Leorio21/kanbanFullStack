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
  // const displayAddBoardForm = useBoardsStore(
  //   (state) => state.displayAddBoardForm
  // );
  // const displayAddTaskForm = useBoardsStore(
  //   (state) => state.displayAddTaskForm
  // );
  // const activeBoard = useBoardsStore((state) => state.activeBoard);

  return (
    <>
      <div className={classNames(styles.container)}>
        <Header />
        <div className={classNames(styles.content)}>
          <SideBar />
          <Content />
        </div>
      </div>
      {/* {displayAddBoardForm.isOpen && displayAddBoardForm.type === "new" && (
        <FormBoard />
      )}
      {displayAddBoardForm.isOpen &&
        displayAddBoardForm.type === "modify" &&
        activeBoard && <FormBoard board={activeBoard} />}
      {displayAddTaskForm && <FormTask />} */}
    </>
  );
}

export default Board;
