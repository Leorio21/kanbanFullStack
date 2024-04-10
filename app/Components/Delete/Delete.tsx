import React, { ComponentPropsWithoutRef } from "react";
import classNames from "classnames/bind";
import styles from "./Delete.module.css";

const cx = classNames.bind(styles);

type DeleteProps = {
  type: "board" | "task";
  name: string;
} & ComponentPropsWithoutRef<"div">;

function Delete({ name, type, children }: DeleteProps) {
  const title = { board: "ce tableau", task: "cette tâche" };
  const message = {
    board: `le tableau '${name}'. Cette action supprimera toutes les colonnes, tâches et sous-tâches`,
    task: `la tâche '${name}' et les sous-tâches`,
  };
  return (
    <div
      className={cx("container", {
        backdrop: type === "board",
      })}
    >
      <div className={cx("messageContainer")}>
        <p className={cx("title")}>Supprimer {title[type]}</p>
        <p className={cx("message")}>
          Êtes vous sûr de vouloir effacer {message[type]}. Cette action est
          irréversible.
        </p>
        <div className={cx("deleteCancelButtonContainer")}>{children}</div>
      </div>
    </div>
  );
}

export default Delete;
