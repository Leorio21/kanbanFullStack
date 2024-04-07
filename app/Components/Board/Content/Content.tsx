import React, { useRef } from "react";
import classNames from "classnames";
import styles from "./Content.module.css";
import { useBoardsStore } from "@/app/Stores/useBoards";
import Empty from "./Empty/Empty";
import Column from "./Column/Column";
import FormTask from "../../FormTask/FormTask";

function Content() {
  const columnColor = ["blue", "purple", "green", "red", "yellow"];
  const activeColumns = useBoardsStore((state) => state.activeColumns);

  if (activeColumns.length === 0) {
    return <Empty />;
  }

  return (
    <>
      <div className={classNames(styles.container)}>
        {activeColumns.map((column, index) => (
          <Column
            key={column.name}
            column={column}
            color={columnColor[index]}
          />
        ))}
        <Column />
      </div>
      <FormTask />
    </>
  );
}

export default Content;
