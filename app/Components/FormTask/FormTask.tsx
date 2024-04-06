import React, { Ref, forwardRef, useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";
import styles from "./FormTask.module.css";
import { ElipsisMenu, Item } from "../ElipsisMenu/ElipsisMenu";
import type { Task } from "@/app/Types/Types";
import { useBoardsStore } from "@/app/Stores/useBoards";
import Delete from "../Delete/Delete";
import Button from "../Button/Button";

const cx = classNames.bind(styles);

type FormTaskProps = {
  task: Task;
};

const FormTask = forwardRef(function FormTask(
  { task }: FormTaskProps,
  ref: Ref<HTMLDivElement>
) {
  const statusRef = useRef<HTMLDivElement>(null);
  const [isOpenStatusList, setIsOpenStatusList] = useState(false);
  const [isOpenDeleteForm, setIsOpenDeleteForm] = useState(false);
  const activeColumnsName = useBoardsStore((state) => state.activeColumnsName);

  const openCloseDeleteForm = (newValue: boolean) => {
    setIsOpenDeleteForm(newValue);
  };

  const closeStatusList = () => {
    setIsOpenStatusList((current) => !current);
  };

  useEffect(() => {
    if (statusRef.current) {
      statusRef.current.addEventListener("mouseleave", () => {
        setIsOpenStatusList(false);
      });
    }
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      statusRef.current?.removeEventListener;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={ref}>
      <article className={cx("container", { hidden: isOpenDeleteForm })}>
        <div className={cx("titleContainer")}>
          <p className={cx("title")}>{task.title}</p>
          <ElipsisMenu position="task">
            <Item>Modifier la tâche</Item>
            <Item type="delete" onClick={() => openCloseDeleteForm(true)}>
              Supprimer la tâche
            </Item>
          </ElipsisMenu>
        </div>
        <p className={cx("description")}>{task.description}</p>
        <div className={cx("subtasksContainer")}>
          <p className={cx("subTitle")}>
            Sous-tâches (
            {task.subtasks.filter((task) => task.isCompleted == true).length} /{" "}
            {task.subtasks.length})
          </p>
        </div>
        <div ref={statusRef} className={cx("statusContainer")}>
          <p className={cx("subTitle")}>Status Actuel</p>
          <p
            className={cx("currentStatus", "button", {
              currentStatusActive: isOpenStatusList,
            })}
            onClick={closeStatusList}
          >
            <span>{task.status}</span>
            <svg
              className={cx("chevron", {
                rotateChevron: isOpenStatusList,
              })}
              width="10"
              height="7"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke="#635FC7"
                strokeWidth="2"
                fill="none"
                d="M9 6 5 2 1 6"
              />
            </svg>
          </p>
          <div className={cx("statusList", { hidden: !isOpenStatusList })}>
            {activeColumnsName.map((columnName) => (
              <p key={columnName} className={cx("statusListItem")}>
                {columnName}
              </p>
            ))}
          </div>
        </div>
      </article>
      <Delete isOpen={isOpenDeleteForm} type="task" name={task.title}>
        <div className={cx("deleteCancelButtonContainer")}>
          <Button color="red" size="medium" width="max">
            Supprimer
          </Button>
          <Button
            color="white"
            size="medium"
            width="auto"
            onClick={() => openCloseDeleteForm(false)}
          >
            Annuler
          </Button>
        </div>
      </Delete>
    </div>
  );
});

export default FormTask;
