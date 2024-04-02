import React from "react";
import BoardTitle from "./BoardTitle/BoardTitle";
import { useBoardsStore } from "@/app/Stores/useBoards";

function BoardList() {
  const boards = useBoardsStore((state) => state.boards);

  return (
    <>
      {boards.map((board) => (
        <BoardTitle key={board.name} board={board} />
      ))}
      <BoardTitle />
    </>
  );
}

export default BoardList;
