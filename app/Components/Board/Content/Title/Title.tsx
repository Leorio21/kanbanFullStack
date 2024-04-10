import React from "react";
import classNames from "classnames/bind";
import styles from "./Title.module.css";
import { useBoardsStore } from "@/app/Stores/useBoards";

const cx = classNames.bind(styles);

type TitleProps = {
  color: string;
  columnName: string;
  columnId: number;
};

function Title({ color, columnName, columnId }: TitleProps) {
  const numberOfTask = useBoardsStore((state) =>
    state.tasks.filter((task) => task.columnId === columnId)
  ).length;
  return (
    <div className={cx("container")}>
      <div className={cx("point", color)}></div>
      {columnName.toUpperCase()} ({numberOfTask})
    </div>
  );
}

export default Title;
