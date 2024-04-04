import React from "react";
import classNames from "classnames";
import styles from "./Column.module.css";
import type { Column } from "@/app/Types/Types";
import Title from "./Title/Title";
import Task from "./Task/Task";

type ColumnProps = {
  column?: Column;
  color?: string;
};

function Column({ column, color }: ColumnProps) {
  if (column && color) {
    return (
      <div className={classNames(`${styles.container} ${styles.column}`)}>
        <Title
          color={color}
          name={column.name}
          numberOfTask={column.tasks.length}
        />
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
