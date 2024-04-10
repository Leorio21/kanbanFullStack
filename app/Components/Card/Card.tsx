import React, { ComponentPropsWithoutRef } from "react";
import classNames from "classnames/bind";
import styles from "./Card.module.css";
import { useBoardsStore } from "@/app/Stores/useBoards";

const cx = classNames.bind(styles);

type CardProps = {
  addNewBoard?: boolean;
  boardName?: string;
  boardId?: number;
} & ComponentPropsWithoutRef<"div">;

function Card({
  addNewBoard = false,
  boardName = "",
  boardId,
  children,
  ...props
}: CardProps) {
  const activeBoard = useBoardsStore((state) => state.activeBoard);

  return (
    <div
      className={cx({
        container: true,
        new: addNewBoard,
        active: boardId === activeBoard,
      })}
      {...props}
    >
      {children}
    </div>
  );
}

export default Card;
