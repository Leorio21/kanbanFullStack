"use client";
import { useEffect } from "react";
import { createId } from "@paralleldrive/cuid2";
import { loadData, useBoardsStore } from "./Stores/useBoards";
import { LogInButton } from "./Components/Auth/AuthButton/AuthButton";

const Home = () => {
  const dataLoaded = useBoardsStore((state) => state.dataLoaded);

  useEffect(() => {
    const getLocalStorage = localStorage.getItem("boards");
    const localSto = getLocalStorage
      ? JSON.parse(getLocalStorage)
      : { state: { dataLoaded: false } };
    if (
      (!dataLoaded && !localStorage.getItem("boards")) ||
      !localSto.state.dataLoaded
    ) {
      loadData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // if (dataLoaded) {
  //   return (
  //     <>
  //       <Board />
  //     </>
  //   );
  // }
  for (let i = 0; i < 4; i++) {
    console.log(createId());
  }
  return (
    <div>
      home
      <LogInButton />
    </div>
  );
};

export default Home;
