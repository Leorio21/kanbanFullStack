import React from "react";
import classNames from "classnames/bind";
import styles from "./Board.module.css";
import Header from "./Header/Header";
import SideBar from "../SideBar/SideBar";
import Content from "./Content/Content";
import FormBoard from "../Form/FormBoard/FormBoard";
import FormTask from "../Form/FormTask/FormTask";
import { useBoardsStore } from "@/app/Stores/useBoards";
import ToggleSideBar from "../SideBar/ToggleSideBar/ToggleSideBar";

const cx = classNames.bind(styles);

function Board() {
  const displayBoardForm = useBoardsStore((state) => state.displayBoardForm);
  const displayTaskForm = useBoardsStore((state) => state.displayTaskForm);
  const activeBoard = useBoardsStore((state) => state.activeBoard);
  const activeTask = useBoardsStore((state) => state.activeTask);
  const sideBarIsClosed = useBoardsStore((state) => state.sideBarIsCLosed);

  return (
    <>
      <div className={cx("container")}>
        <Header />
        <div className={cx("content", { sideBarClose: sideBarIsClosed })}>
          <SideBar />
          <Content />
        </div>
        <ToggleSideBar />
      </div>
      {displayBoardForm.isOpen && displayBoardForm.method === "new" && (
        <FormBoard />
      )}
      {displayBoardForm.isOpen &&
        displayBoardForm.method === "modify" &&
        activeBoard !== null && <FormBoard boardId={activeBoard} />}
      {displayTaskForm.isOpen && displayTaskForm.method === "new" && (
        <FormTask />
      )}
      {displayTaskForm.isOpen &&
        displayTaskForm.method === "modify" &&
        activeTask !== null && <FormTask taskId={activeTask} />}
    </>
  );
}

export default Board;
