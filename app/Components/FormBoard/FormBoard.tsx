import React, { useEffect, useId, useRef, useState } from "react";
import classNames from "classnames";
import styles from "./FormBoard.module.css";
import { useBoardsStore } from "@/app/Stores/useBoards";
import Button from "../Button/Button";
import Input from "../FormComponent/Input/Input";
import InputList from "../FormComponent/InputList/InputList";

function FormBoard() {
  const formRef = useRef<HTMLFormElement>(null);
  const openBoardForm = useBoardsStore((state) => state.openBoardForm);

  const closeForm = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const elementCliked = event.target as HTMLElement;
    if (!formRef.current?.contains(elementCliked)) {
      openBoardForm(false);
    }
  };

  return (
    <div className={classNames(styles.container)} onClick={closeForm}>
      <form ref={formRef} className={classNames(styles.formContainer)}>
        <p className={classNames(styles.title)}>Ajouter un nouveau tableau</p>
        <Input
          label="Nom du tableau"
          type="text"
          name="boardName"
          placeholder="ex : Web Design"
        />
        <InputList title="Colonnes" />

        <Button color="purple" size="medium" width="auto">
          Créer le tableau
        </Button>
      </form>
    </div>
  );
}

export default FormBoard;
