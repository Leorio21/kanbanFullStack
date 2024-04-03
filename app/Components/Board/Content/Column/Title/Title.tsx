import React from "react";
import classNames from "classnames/bind";
import styles from "./Title.module.css";

const cx = classNames.bind(styles);

type TitleProps = {
  color: string;
  name: string;
  numberOfTask: number;
};

function Title({ color, name, numberOfTask }: TitleProps) {
  return (
    <div className={cx("container")}>
      <div className={cx("point", color)}></div>
      {name.toUpperCase()} ({numberOfTask})
    </div>
  );
}

export default Title;
