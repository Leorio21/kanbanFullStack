import React from "react";
import classNames from "classnames";
import styles from "./Empty.module.css";
import Button from "@/app/Components/Form/Components/Button/Button";
import { useBoardsStore } from "@/app/Stores/useBoards";

function Empty() {
  const openBoardForm = useBoardsStore((state) => state.openBoardForm);
  return (
    <div className={classNames(styles.container)}>
      <p>Ce tableau est vide. Créer une colonne pour commencer.</p>
      <Button
        onClick={() => openBoardForm(true, "modify")}
        color="purple"
        size="medium"
      >
        <svg width="12" height="12" xmlns="http://www.w3.org/2000/svg">
          <path
            fill="#FFF"
            d="M7.368 12V7.344H12V4.632H7.368V0H4.656v4.632H0v2.712h4.656V12z"
          />
        </svg>
        &nbsp;Ajouter une colonne
      </Button>
    </div>
  );
}

export default Empty;
