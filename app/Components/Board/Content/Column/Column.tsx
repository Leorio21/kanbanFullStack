import React from "react";
import classNames from "classnames";
import styles from "./Column.module.css";
import type { Column } from "@/app/Types/Types";
import Task from "./Task/Task";
import { useBoardsStore } from "@/app/Stores/useBoards";

type ColumnProps = {
  columnId?: number;
};

function Column({ columnId }: ColumnProps) {
  const tasks = useBoardsStore((state) =>
    state.tasks.filter((task) => task.columnId === columnId)
  );
  if (columnId !== undefined) {
    return (
      <div className={classNames(`${styles.container} ${styles.column}`)}>
        {tasks.map((task) => (
          <Task key={task.id} task={task} />
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
