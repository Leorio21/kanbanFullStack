import React, { ComponentPropsWithoutRef } from "react";
import classNames from "classnames/bind";
import styles from "./Card.module.css";
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
  const activeBoardName = useBoardsStore((state) => state.activeBoardName);

  return (
    <div
      className={cx({
        container: true,
        new: addNewBoard,
        active: boardName === activeBoardName,
      })}
      {...props}
    >
      {children}
    </div>
  );
}

export default Card;
