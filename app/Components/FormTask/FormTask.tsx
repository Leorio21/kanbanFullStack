import React, { ComponentPropsWithoutRef, Ref, forwardRef } from "react";
import classNames from "classnames";
import styles from "./FormTask.module.css";
import type { Task } from "@/app/Types/Types";

type FormTaskProps = {
  task: Task;
};

const FormTask = forwardRef(function FormTask(
  { task }: FormTaskProps,
  ref: Ref<HTMLDivElement>
) {
  return (
    <div ref={ref} className={classNames(styles.container)}>
      <div>{task.title}</div>
      <p>{task.description}</p>
      <div>
        Sous-tâches (
        {task.subtasks.filter((task) => task.isCompleted == true).length} /{" "}
        {task.subtasks.length})
      </div>
    </div>
  );
});

export default FormTask;
