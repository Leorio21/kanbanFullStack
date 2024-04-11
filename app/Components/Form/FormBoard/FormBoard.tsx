import React, { useRef } from "react";
import classNames from "classnames";
import styles from "./FormBoard.module.css";
import { useBoardsStore } from "@/app/Stores/useBoards";
import Button from "../Components/Button/Button";
import Input from "../Components/Input/Input";
import InputList from "../Components/InputList/InputList";

type FormBoardProps = {
  boardId?: number;
};

function FormBoard({ boardId }: FormBoardProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const board = useBoardsStore((state) =>
    state.boards.filter((board) => board.id === boardId)
  );
  const columns = useBoardsStore((state) =>
    state.columns.filter((column) => column.boardId === state.activeBoard)
  );
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
        <p className={classNames(styles.title)}>
          {boardId ? "Modifier le tableau" : "Ajouter un nouveau tableau"}
        </p>
        <Input
          label="Nom du tableau"
          type="text"
          name="boardName"
          placeholder="ex : Web Design"
          content={board.length > 0 ? board[0].name : undefined}
        />
        <InputList
          title="Colonnes"
          type="column"
          columns={boardId ? columns : undefined}
        />

        <Button color="purple" size="medium" width="auto">
          {boardId ? "Modifier le tableau" : "Créer le tableau"}
        </Button>
      </form>
    </div>
  );
}

export default FormBoard;