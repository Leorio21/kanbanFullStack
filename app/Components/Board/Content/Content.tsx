import React from "react";
import classNames from "classnames";
import styles from "./Content.module.css";
import { useBoardsStore } from "@/app/Stores/useBoards";
import Empty from "./Empty/Empty";
import Column from "./Column/Column";
import Title from "./Title/Title";

function Content() {
  const columnColor = ["blue", "purple", "green", "red", "yellow"];
  const activeBoard = useBoardsStore((state) => state.activeBoard);
  const columns = useBoardsStore((state) =>
    state.columns.filter((column) => column.boardId === state.activeBoard)
  );

  if (activeBoard === null) {
    return;
  }

  if (columns.length === 0) {
    return <Empty />;
  }

  return (
    <div className={classNames(styles.container)}>
      <div className={classNames(styles.titleContainer)}>
        {columns.map((column, index) => (
          <Title
            key={column.id}
            columnName={column.name}
            color={columnColor[index % 5]}
            columnId={column.id}
          />
        ))}
      </div>
      <div className={classNames(styles.columnsContainer)}>
        {columns.map((column) => (
          <Column key={column.id} columnId={column.id} />
        ))}
      </div>
    </div>
  );
}

export default Content;
