import React from "react";
import classNames from "classnames/bind";
import styles from "./Logo.module.css";
import { useBoardsStore } from "@/app/Stores/useBoards";

const cx = classNames.bind(styles);

function Logo() {
  const sideBarIsCLosed = useBoardsStore((state) => state.sideBarIsCLosed);

  return (
    <div className={cx("container", { containerReduce: sideBarIsCLosed })}>
      <div className={cx("barContainer")}>
        <div className={cx("bar", "bar1")}> </div>
        <div className={cx("bar", "bar2")}> </div>
        <div className={cx("bar", "bar3")}> </div>
      </div>
      <p className={cx("title")}>kanban</p>
    </div>
  );
}

export default Logo;
