import React, { useRef } from "react";
import classNames from "classnames";
import styles from "./FormTask.module.css";
import { useBoardsStore } from "@/app/Stores/useBoards";
import Button from "../Button/Button";
import Input from "../FormComponent/Input/Input";
import InputList from "../FormComponent/InputList/InputList";
import TextArea from "../FormComponent/TextArea/TextArea";

type FormTaskProps = {
  boardId?: number;
};

function FormTask({ boardId }: FormTaskProps) {
  const formRef = useRef<HTMLFormElement>(null);
  // const board = useBoardsStore((state) =>
  //   state.boards.filter((board) => board.id === boardId)
  // );
  // const columns = useBoardsStore((state) =>
  //   state.columns.filter((column) => column.boardId === state.activeBoard)
  // );
  const openTaskForm = useBoardsStore((state) => state.openTaskForm);

  const closeForm = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const elementCliked = event.target as HTMLElement;
    if (!formRef.current?.contains(elementCliked)) {
      openTaskForm(false);
    }
  };

  return (
    <div className={classNames(styles.container)} onClick={closeForm}>
      <form ref={formRef} className={classNames(styles.formContainer)}>
        <p className={classNames(styles.title)}>
          {boardId ? "Modifier la tâche" : "Ajouter une nouvelle tâche"}
        </p>
        <Input
          label="Nom de la tâche"
          type="text"
          name="boardName"
          placeholder="ex : Faire une pause café"
          // content={board.length > 0 ? board[0].name : undefined}
        />
        <TextArea
          label="Description"
          name="boardName"
          rows={5}
          placeholder="ex : C'est toujours bon de faire un break. Une pause pour recharger les batteries."
          // content={board.length > 0 ? board[0].name : undefined}
        />
        <InputList
          title="Sous-tâches"
          type="subtask"
          placeHolder={["ex: Faire le café", "ex: Boire un café et sourire"]}
        />

        <Button color="purple" size="medium" width="auto">
          {boardId ? "Modifier la tâche" : "Créer la tâche"}
        </Button>
      </form>
    </div>
  );
}

export default FormTask;
