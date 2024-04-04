"use client";
import React, { useState } from "react";
import classNames from "classnames";
import styles from "./Options.module.css";
import Button from "@/app/Components/Button/Button";
import SubMenu from "./SubMenu/SubMenu";
import { useBoardsStore } from "@/app/Stores/useBoards";

function Options() {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const activeBoard = useBoardsStore((state) => state.activeBoard);

  const openCloseSubMenu = () => {
    setMenuIsOpen((current) => !current);
  };

  return (
    <div className={classNames(styles.container)}>
      <Button
        color="purple"
        size="medium"
        disable={activeBoard?.columns.length === 0}
      >
        + Ajouter une tâche
      </Button>
      <svg
        width="5"
        height="20"
        xmlns="http://www.w3.org/2000/svg"
        className={classNames(styles.button)}
        onClick={openCloseSubMenu}
      >
        <g fill="#828FA3" fillRule="evenodd">
          <circle cx="2.308" cy="2.308" r="2.308" />
          <circle cx="2.308" cy="10" r="2.308" />
          <circle cx="2.308" cy="17.692" r="2.308" />
        </g>
      </svg>
      <SubMenu menuIsOpen={menuIsOpen} />
    </div>
  );
}

export default Options;
