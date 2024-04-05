import React, { useRef, useState } from "react";
import classNames from "classnames/bind";
import styles from "./Task.module.css";
import type { Task } from "@/app/Types/Types";
import FormTask from "@/app/Components/FormTask/FormTask";

const cx = classNames.bind(styles);

type TaskProps = {
  task: Task;
};

function Task({ task }: TaskProps) {
  const [isOpenInfo, setIsOpenInfo] = useState(false);
  const taskInfosRef = useRef<HTMLDivElement>(null);

  const openCloseTaskInfo = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const elementClicked = event.target as HTMLDivElement;
    if (!isOpenInfo || !taskInfosRef.current?.contains(elementClicked))
      setIsOpenInfo((current) => !current);
  };

  return (
    <>
      <article className={cx("container")} onClick={openCloseTaskInfo}>
        <p className={cx("title")}>{task.title}</p>
        <p className={cx("subtask")}>
          {task.subtasks.filter((task) => task.isCompleted == true).length} /{" "}
          {task.subtasks.length} sous-tâches
        </p>
      </article>
      <div
        className={cx("formContainer", { active: isOpenInfo })}
        onClick={openCloseTaskInfo}
      >
        <FormTask ref={taskInfosRef} task={task} />
      </div>
    </>
  );
}

export default Task;
