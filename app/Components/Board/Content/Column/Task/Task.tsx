import React from "react";
import classNames from "classnames/bind";
import styles from "./Task.module.css";
import type { TTask } from "@/app/Types/Types";
import { useBoardsStore } from "@/app/Stores/useBoards";

const cx = classNames.bind(styles);

type TaskProps = {
  task: TTask;
};

function Task({ task }: TaskProps) {
  const changeActiveTask = useBoardsStore((state) => state.changeActiveTask);
  const numberOfsubtasks = useBoardsStore(
    (state) =>
      state.subtasks.filter((subtask) => subtask.taskId === task.id).length
  );
  const numberOfsubtasksCompleted = useBoardsStore(
    (state) =>
      state.subtasks.filter(
        (subtask) => subtask.taskId === task.id && subtask.isCompleted
      ).length
  );
  return (
    <article
      className={cx("container")}
      onClick={() => changeActiveTask(task.id)}
    >
      <p className={cx("title")}>{task.title}</p>
      <p className={cx("subtask")}>
        {numberOfsubtasksCompleted} / {numberOfsubtasks} sous-tâches
      </p>
    </article>
  );
}

export default Task;
