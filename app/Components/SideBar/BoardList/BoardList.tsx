import { Board } from "@/app/Types/Types";
import React from "react";
import BoardTitle from "./BoardTitle/BoardTitle";

type BoardListProps = {
  boards: Board[];
  activeBoard: Board;
};

function BoardList({ boards, activeBoard }: BoardListProps) {
  return (
    <>
      {boards.map((board) => (
        <BoardTitle key={board.name} board={board} activeBoard={activeBoard} />
      ))}
      <BoardTitle />
    </>
  );
}

export default BoardList;
