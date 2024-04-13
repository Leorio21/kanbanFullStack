"use client";
import { useEffect, useState } from "react";
import Board from "./Components/Board/Board";
import { loadData, useBoardsStore } from "./Stores/useBoards";

export default function Home() {
  const [data, setData] = useState(false);
  const dataLoaded = useBoardsStore((state) => state.dataLoaded);

  useEffect(() => {
    if (!dataLoaded && !localStorage.getItem("boards")) {
      loadData();
    }
    setData(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (data) {
    return (
      <>
        <Board />
      </>
    );
  }
}
