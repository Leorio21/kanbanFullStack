import React from "react";
import classNames from "classnames/bind";
import styles from "./Subtask.module.css";
import { useBoardsStore } from "@/app/Stores/useBoards";
import type { TSubtask } from "@/app/Types/Types";

const cx = classNames.bind(styles);

type SubtaskProps = {
  subtask: TSubtask;
};

function Subtask({ subtask }: SubtaskProps) {
  const changeSubtaskStatus = useBoardsStore(
    (state) => state.changesubtaskStatus
  );
  const onChangeSubtaskStatus = (newStatus: boolean) => {
    // subtask.isCompleted = newStatus;
    changeSubtaskStatus(subtask.id, newStatus);
  };
  return (
    <div
      className={cx("container")}
      onClick={() => onChangeSubtaskStatus(!subtask.isCompleted)}
    >
      <span className={cx("checkBox", { check: subtask.isCompleted })}>
        {subtask.isCompleted && (
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
      <span className={cx("title", { completed: subtask.isCompleted })}>
        {subtask.title}
      </span>
    </div>
  );
}

export default Subtask;
