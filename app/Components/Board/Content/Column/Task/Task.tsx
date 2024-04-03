import React from "react";
import classNames from "classnames";
import styles from "./Task.module.css";
import { Task } from "@/app/Types/Types";

type TaskProps = {
  task: Task;
};

function Task({ task }: TaskProps) {
  return (
    <div className={classNames(styles.container)}>
      <p className={classNames(styles.title)}>{task.title}</p>
      <p className={classNames(styles.subtask)}>{task.subtasks.filter((task) => task.isCompleted == true).length} / {task.subtasks.length} sous-tâches</p>
    </div>
  );
}

export default Task;
