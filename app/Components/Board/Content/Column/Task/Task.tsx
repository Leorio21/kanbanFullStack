import React from "react";
import classNames from "classnames/bind";
import styles from "./Task.module.css";
import type { Task } from "@/app/Types/Types";
import { useBoardsStore } from "@/app/Stores/useBoards";

const cx = classNames.bind(styles);

type TaskProps = {
  task: Task;
};

function Task({ task }: TaskProps) {
  const changeActiveTask = useBoardsStore((state) => state.changeActiveTask);
  return (
    <article className={cx("container")} onClick={() => changeActiveTask(task)}>
      <p className={cx("title")}>{task.title}</p>
      <p className={cx("subtask")}>
        {task.subtasks.filter((task) => task.isCompleted == true).length} /{" "}
        {task.subtasks.length} sous-tâches
      </p>
    </article>
  );
}

export default Task;
