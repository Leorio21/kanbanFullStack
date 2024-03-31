import { Board } from "@/app/Types/Types";
import React from "react";
import BoardTitle from "./BoardTitle/BoardTitle";

type BoardListProps = {
  boards: Board[];
  activeBoard: Board;
  changeActiveBoard: (newBoard: Board) => void;
};

function BoardList({ boards, activeBoard, changeActiveBoard }: BoardListProps) {
  return (
    <>
      {boards.map((board) => (
        <BoardTitle key={board.name} board={board} activeBoard={activeBoard} onClick={() => changeActiveBoard(board)} />
      ))}
      <BoardTitle />
    </>
  );
}

export default BoardList;
