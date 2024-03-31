"use client";
import Header from "./Components/Board/Header/Header";
import SideBar from "./Components/SideBar/SideBar";
import styles from "./page.module.css";
import boardsJson from "../data.json";
import { useState } from "react";

export default function Home() {
  const boards = boardsJson.boards;
  const [activeBoard, setActiveBoard] = useState(boards[0]);

  return (
    <>
      <Header />
      <SideBar boards={boards} activeBoard={activeBoard} />
    </>
  );
}
