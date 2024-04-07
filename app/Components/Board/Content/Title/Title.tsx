import React from "react";
import classNames from "classnames/bind";
import styles from "./Title.module.css";

const cx = classNames.bind(styles);

type TitleProps = {
  color: string;
  columnName: string;
  numberOfTask: number;
};

function Title({ color, columnName, numberOfTask }: TitleProps) {
  return (
    <div className={cx("container")}>
      <div className={cx("point", color)}></div>
      {columnName.toUpperCase()} ({numberOfTask})
    </div>
  );
}

export default Title;
