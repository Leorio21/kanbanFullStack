import React, { useEffect } from "react";
import classNames from "classnames";
import styles from "./Column.module.css";
import type { TTask } from "@/app/Types/Types";
import Task from "./Task/Task";
import { useBoardsStore } from "@/app/Stores/useBoards";
import { ParentConfig, handleEnd } from "@formkit/drag-and-drop";
import { useDragAndDrop } from "@formkit/drag-and-drop/react";

type ColumnProps = {
  columnId: number;
};

function Column({ columnId }: ColumnProps) {
  const changeTaskStatus = useBoardsStore((state) => state.changeTaskStatus);
  const taskAddedModified = useBoardsStore((state) => state.taskAddedModified);
  const updateTasks = useBoardsStore((state) => state.updateTasks);
  const config1: Partial<ParentConfig<TTask>> = { group: "taskList" };

  config1.handleEnd = (data) => {
    const taskID = Number(data.targetData.node.data.value.id);
    const destination = Number(data.targetData.parent.el.id);
    changeTaskStatus(destination, taskID);
    handleEnd(data);
  };

  const tasksList = useBoardsStore((state) =>
    state.tasks.filter((task) => task.columnId === columnId)
  );
  const [colRef, tasks, setTasks] = useDragAndDrop<HTMLDivElement, TTask>(
    tasksList,
    config1
  );

  useEffect(() => {
    if (taskAddedModified) {
      setTasks(tasksList);
      updateTasks(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tasksList]);

  return (
    <div
      ref={colRef}
      className={classNames(`${styles.container} ${styles.column}`)}
      id={columnId.toString()}
    >
      {tasks.map((task) => (
        <Task key={task.id} task={task} />
      ))}
    </div>
  );
}

export default Column;
