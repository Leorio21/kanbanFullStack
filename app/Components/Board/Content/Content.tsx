import React from "react";
import classNames from "classnames";
import styles from "./Content.module.css";
import { useBoardsStore } from "@/app/Stores/useBoards";
import Empty from "./Empty/Empty";
import Column from "./Column/Column";
import FormTask from "../../FormTask/FormTask";
import Title from "./Title/Title";

function Content() {
  const columnColor = ["blue", "purple", "green", "red", "yellow"];
  const activeColumns = useBoardsStore((state) => state.activeColumns);
  const activeColumnsName = useBoardsStore((state) => state.activeColumnsName);

  if (activeColumns.length === 0) {
    return <Empty />;
  }

  return (
    <div className={classNames(styles.container)}>
      <div className={classNames(styles.titleContainer)}>
        {activeColumnsName.map((columnName, index) => (
          <Title
            key={index}
            columnName={columnName}
            color={columnColor[index % 5]}
            numberOfTask={activeColumns[index].tasks.length}
          />
        ))}
      </div>
      <div className={classNames(styles.columnsContainer)}>
        {activeColumns.map((column) => (
          <Column key={column.name} column={column} />
        ))}
        <Column />
      </div>
      <FormTask />
    </div>
  );
}

export default Content;
