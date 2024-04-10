import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";
import styles from "./ViewTask.module.css";
import { ElipsisMenu, Item } from "../ElipsisMenu/ElipsisMenu";
import { useBoardsStore } from "@/app/Stores/useBoards";
import Delete from "../Delete/Delete";
import Button from "../Button/Button";
import SubTask from "./SubTask/SubTask";

const cx = classNames.bind(styles);

function ViewTask() {
  const taskRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const [isOpenStatusList, setIsOpenStatusList] = useState(false);
  const [isOpenDeleteForm, setIsOpenDeleteForm] = useState(false);
  const columnsName = useBoardsStore((state) =>
    state.columns.filter((column) => column.boardId === state.activeBoard)
  );
  const task = useBoardsStore((state) =>
    state.tasks.filter((task) => task.id === state.activeTask)
  );
  const subtasks = useBoardsStore((state) =>
    state.subTasks.filter((subtask) => subtask.taskId === task[0].id)
  );
  const activeTask = useBoardsStore((state) => state.activeTask);
  const changeActiveTask = useBoardsStore((state) => state.changeActiveTask);
  const deleteTask = useBoardsStore((state) => state.deleteTask);

  const closeTask = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const elementClicked = event.target as HTMLDivElement;
    if (!taskRef.current?.contains(elementClicked)) {
      changeActiveTask(null);
    }
  };

  const openCloseDeleteForm = (newValue: boolean) => {
    setIsOpenDeleteForm(newValue);
  };

  const closeStatusList = () => {
    setIsOpenStatusList((current) => !current);
  };

  const onDeleteHandler = () => {
    deleteTask();
    setIsOpenDeleteForm(false);
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
  }, [activeTask]);
  return (
    <section className={cx("container")} onClick={closeTask}>
      <div ref={taskRef}>
        <article className={cx("taskContainer", { hidden: isOpenDeleteForm })}>
          <div className={cx("titleContainer")}>
            <p className={cx("title")}>{task[0].title}</p>
            <ElipsisMenu position="task">
              <Item>Modifier la tâche</Item>
              <Item type="delete" onClick={() => openCloseDeleteForm(true)}>
                Supprimer la tâche
              </Item>
            </ElipsisMenu>
          </div>
          <p className={cx("description")}>{task[0].description}</p>
          <div className={cx("subtasksContainer")}>
            <p className={cx("subTitle")}>
              Sous-tâches (
              {subtasks.filter((subtask) => subtask.isCompleted == true).length}{" "}
              / {subtasks.length})
            </p>
            {subtasks.map((subtask, index) => (
              <SubTask key={index} {...subtask} />
            ))}
          </div>
          <div ref={statusRef} className={cx("statusContainer")}>
            <p className={cx("subTitle")}>Status Actuel</p>
            <p
              className={cx("currentStatus", "button", {
                currentStatusActive: isOpenStatusList,
              })}
              onClick={closeStatusList}
            >
              <span>{task[0].status}</span>
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
              {columnsName.map((column) => (
                <p key={column.id} className={cx("statusListItem")}>
                  {column.name}
                </p>
              ))}
            </div>
          </div>
        </article>
        {isOpenDeleteForm && (
          <Delete type="task" name={task[0].title}>
            <Button
              color="red"
              size="medium"
              width="max"
              onClick={onDeleteHandler}
            >
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
          </Delete>
        )}
      </div>
    </section>
  );
}

export default ViewTask;
