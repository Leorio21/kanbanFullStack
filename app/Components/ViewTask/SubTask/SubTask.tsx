import React from "react";
import classNames from "classnames/bind";
import styles from "./SubTask.module.css";

const cx = classNames.bind(styles);

type SubTaskProps = {
  title: string;
  isCompleted: boolean;
};

function SubTask({ title, isCompleted }: SubTaskProps) {
  return (
    <div className={cx("container")}>
      <span className={cx("checkBox", { check: isCompleted })}>
        {isCompleted && (
          <svg width="10" height="8" xmlns="http://www.w3.org/2000/svg">
            <path
              stroke="#FFF"
              strokeWidth="2"
              fill="none"
              d="m1.276 3.066 2.756 2.756 5-5"
            />
          </svg>
        )}
      </span>
      <span className={cx("title", { completed: isCompleted })}>{title}</span>
    </div>
  );
}

export default SubTask;
