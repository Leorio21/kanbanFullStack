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
        size="large"
      >
        + Ajouter une colonne
      </Button>
    </div>
  );
}

export default Empty;
