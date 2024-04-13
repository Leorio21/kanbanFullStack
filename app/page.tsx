"use client";
import { useEffect, useState } from "react";
import Board from "./Components/Board/Board";
import { loadData, useBoardsStore } from "./Stores/useBoards";

export default function Home() {
  const dataLoaded = useBoardsStore((state) => state.dataLoaded);

  useEffect(() => {
    const getLocalStorage = localStorage.getItem("boards");
    const localSto = getLocalStorage
      ? JSON.parse(getLocalStorage)
      : { state: { dataLoaded: false } };
    console.log(localSto);
    if (
      (!dataLoaded && !localStorage.getItem("boards")) ||
      !localSto.state.dataLoaded
    ) {
      loadData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (dataLoaded) {
    return (
      <>
        <Board />
      </>
    );
  }
}
