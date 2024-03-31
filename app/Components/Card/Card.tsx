import React, { ComponentPropsWithoutRef } from "react";
import classNames from "classnames/bind";
import styles from "./Card.module.css";
import { Board } from "@/app/Types/Types";

const cx = classNames.bind(styles);

type CardProps = {
  addNewBoard?: boolean;
  boardName?: string;
  activeBoard?: Board;
} & ComponentPropsWithoutRef<"div">;

function Card({ addNewBoard = false, boardName = "", activeBoard,children }: CardProps) {
  return (
    <div className={cx({ container: true, new: addNewBoard, active: boardName===activeBoard?.name })}>
      {children}
    </div>
  );
}

export default Card;
