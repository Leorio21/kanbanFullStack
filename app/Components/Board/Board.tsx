import React from "react";
import classNames from "classnames";
import styles from "./Board.module.css";
import Header from "./Header/Header";
import SideBar from "../SideBar/SideBar";
import Content from "./Content/Content";

function Board() {
  return (
    <div className={classNames(styles.container)} >
      <Header />
      <div className={classNames(styles.content)} >
        <SideBar />
        <Content />
      </div>
    </div>
  );
}

export default Board;
