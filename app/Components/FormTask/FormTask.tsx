import React, { Ref, forwardRef } from "react";
import classNames from "classnames";
import styles from "./FormTask.module.css";
import { ElipsisMenu, Item } from "../ElipsisMenu/ElipsisMenu";
import type { Task } from "@/app/Types/Types";

type FormTaskProps = {
  task: Task;
};

const FormTask = forwardRef(function FormTask(
  { task }: FormTaskProps,
  ref: Ref<HTMLDivElement>
) {
  return (
    <article ref={ref} className={classNames(styles.container)}>
      <div className={classNames(styles.titleContainer)}>
        <p className={classNames(styles.title)}>{task.title}</p>
        <ElipsisMenu position="task">
          <Item>Modifier la tâche</Item>
          <Item type="delete">Supprimer la tâche</Item>
        </ElipsisMenu>
      </div>
      <p className={classNames(styles.description)}>{task.description}</p>
      <div className={classNames(styles.subtasksContainer)}>
        <p className={classNames(styles.subTitle)}>
          Sous-tâches (
          {task.subtasks.filter((task) => task.isCompleted == true).length} /{" "}
          {task.subtasks.length})
        </p>
      </div>
      <div className={classNames(styles.statusContainer)}>
        <p className={classNames(styles.subTitle)}>Status Actuel</p>
        <p className={classNames(styles.currentStatus)}>
          {task.status}
          <svg
            className={classNames(styles.button)}
            width="10"
            height="7"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke="#635FC7"
              strokeWidth="2"
              fill="none"
              d="m1 1 4 4 4-4"
            />
          </svg>
        </p>
      </div>
    </article>
  );
});

export default FormTask;
