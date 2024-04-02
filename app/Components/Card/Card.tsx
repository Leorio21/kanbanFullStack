import React, { ComponentPropsWithoutRef } from "react";
import classNames from "classnames/bind";
import styles from "./Card.module.css";
import { Board } from "@/app/Types/Types";
import { useBoardsStore } from "@/app/Stores/useBoards";

const cx = classNames.bind(styles);

type CardProps = {
  addNewBoard?: boolean;
  boardName?: string;
} & ComponentPropsWithoutRef<"div">;

function Card({
  addNewBoard = false,
  boardName = "",
  children,
  ...props
}: CardProps) {
  const activeBoard = useBoardsStore((state) => state.activeBoard);

  return (
    <div
      className={cx({
        container: true,
        new: addNewBoard,
        active: boardName === activeBoard,
      })}
      {...props}
    >
      {children}
    </div>
  );
}

export default Card;
