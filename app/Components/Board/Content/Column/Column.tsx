import React from "react";
import classNames from "classnames";
import styles from "./Column.module.css";
import type { Column } from "@/app/Types/Types";
import Task from "./Task/Task";

type ColumnProps = {
  column?: Column;
};

function Column({ column }: ColumnProps) {
  if (column) {
    return (
      <div className={classNames(`${styles.container} ${styles.column}`)}>
        {column.tasks.map((task) => (
          <Task key={task.title} task={task} />
        ))}
      </div>
    );
  }

  return (
    <div className={classNames(`${styles.container} ${styles.newColumn}`)}>
      + Nouvelle colonne
    </div>
  );
}

export default Column;
