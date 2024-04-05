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
  const testRef = useRef<HTMLDivElement>(null);

  const openCloseTaskInfo = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const div = event.target as HTMLDivElement;
    if (!isOpenInfo || !testRef.current?.contains(div))
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
        onClick={openCloseTaskInfo}
        className={cx("formContainer", { active: isOpenInfo })}
      >
        <FormTask ref={testRef} task={task} />
      </div>
    </>
  );
}

export default Task;
