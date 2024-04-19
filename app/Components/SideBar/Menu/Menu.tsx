import React, { ComponentPropsWithRef, Ref, forwardRef } from "react";
import classNames from "classnames";
import styles from "./Menu.module.css";
import { useBoardsStore } from "@/app/Stores/useBoards";
import BoardList from "../BoardList/BoardList";
import ThemeSelector from "../ThemeSelector/ThemeSelector";

type MenuProps = ComponentPropsWithRef<"div">;

const Menu = forwardRef<HTMLDivElement, MenuProps>(function Menu(props, ref) {
  const nbBoards = useBoardsStore((state) => state.boards.length);

  return (
    <div ref={ref} className={classNames(styles.container)}>
      <div className={classNames(styles.boardListContainer)}>
        <p className={classNames(styles.boardListTitle)}>
          Tous les tableaux ({nbBoards})
        </p>
        <BoardList />
      </div>
      <ThemeSelector />
    </div>
  );
});

export default Menu;
