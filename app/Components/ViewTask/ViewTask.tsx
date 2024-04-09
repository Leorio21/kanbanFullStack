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
  const deleteFormRef = useRef<HTMLDivElement>(null);
  const [isOpenStatusList, setIsOpenStatusList] = useState(false);
  const [isOpenDeleteForm, setIsOpenDeleteForm] = useState(false);
  const activeColumnsName = useBoardsStore((state) => state.activeColumnsName);
  const activeTask = useBoardsStore((state) => state.activeTask);
  const changeActiveTask = useBoardsStore((state) => state.changeActiveTask);

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

  if (activeTask) {
    return (
      <section className={cx("container")} onClick={closeTask}>
        <div ref={taskRef}>
          <article
            className={cx("taskContainer", { hidden: isOpenDeleteForm })}
          >
            <div className={cx("titleContainer")}>
              <p className={cx("title")}>{activeTask.title}</p>
              <ElipsisMenu position="task">
                <Item>Modifier la tâche</Item>
                <Item type="delete" onClick={() => openCloseDeleteForm(true)}>
                  Supprimer la tâche
                </Item>
              </ElipsisMenu>
            </div>
            <p className={cx("description")}>{activeTask.description}</p>
            <div className={cx("subtasksContainer")}>
              <p className={cx("subTitle")}>
                Sous-tâches (
                {
                  activeTask.subtasks.filter(
                    (subtask) => subtask.isCompleted == true
                  ).length
                }{" "}
                / {activeTask.subtasks.length})
              </p>
              {activeTask.subtasks.map((subtask, index) => (
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
                <span>{activeTask.status}</span>
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
          {isOpenDeleteForm && (
            <Delete
              ref={deleteFormRef}
              isOpen={isOpenDeleteForm}
              type="task"
              name={activeTask.title}
            >
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
            </Delete>
          )}
        </div>
      </section>
    );
  }
}

export default ViewTask;
