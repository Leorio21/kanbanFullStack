"use client";
import Board from "./Components/Board/Board";
import { loadData, useBoardsStore } from "./Stores/useBoards";

export default function Home() {
  const dataLoaded = useBoardsStore((state) => state.dataLoaded);
  if (!dataLoaded && !localStorage.getItem("boards")) {
    loadData();
  }
  if (dataLoaded) {
    return (
      <>
        <Board />
      </>
    );
  }
}
