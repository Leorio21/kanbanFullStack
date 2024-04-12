import React, { useRef, useState } from "react";
import classNames from "classnames";
import styles from "./FormBoard.module.css";
import { useForm, SubmitHandler } from "react-hook-form";
import { useBoardsStore } from "@/app/Stores/useBoards";
import Button from "../Components/Button/Button";
import Input from "../Components/Input/Input";
import InputList from "../Components/InputList/InputList";
import { FormInputs } from "@/app/Types/Types";

type FormBoardProps = {
  boardId?: number;
};

function FormBoard({ boardId }: FormBoardProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();
  const board = useBoardsStore((state) =>
    state.boards.filter((board) => board.id === boardId)
  );
  const columns = useBoardsStore((state) =>
    state.columns.filter((column) => column.boardId === state.activeBoard)
  );
  const openBoardForm = useBoardsStore((state) => state.openBoardForm);
  const addNewBoard = useBoardsStore((state) => state.addNewBoard);
  const modifyBoard = useBoardsStore((state) => state.modifyBoard);
  const deleteColumn = useBoardsStore((state) => state.deleteColumn);

  const [columnsIdToDelete, setColumsIdToDelete] = useState<number[]>([]);

  const addIdToDelete = (idToAdd: number) => {
    setColumsIdToDelete((current) => [...current, idToAdd]);
  };

  const closeForm = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const elementCliked = event.target as HTMLElement;
    if (!formRef.current?.contains(elementCliked)) {
      openBoardForm(false);
    }
  };

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    if (boardId !== undefined) {
      modifyBoard(data, boardId);
      columnsIdToDelete.forEach((id) => deleteColumn(id));
      openBoardForm(false);
    } else {
      addNewBoard(data);
      openBoardForm(false);
    }
  };

  return (
    <div className={classNames(styles.container)} onClick={closeForm}>
      <form
        ref={formRef}
        className={classNames(styles.formContainer)}
        onSubmit={handleSubmit(onSubmit)}
      >
        <p className={classNames(styles.title)}>
          {boardId !== undefined
            ? "Modifier le tableau"
            : "Ajouter un nouveau tableau"}
        </p>
        <Input
          label="Nom du tableau"
          type="text"
          fieldName="boardName"
          register={register}
          errors={errors}
          placeholder="ex : Web Design"
          notNull={true}
          content={board.length > 0 ? board[0].name : undefined}
        />
        <InputList
          title="Colonnes"
          type="column"
          register={register}
          errors={errors}
          addIdToDelete={addIdToDelete}
          columns={boardId !== undefined ? columns : undefined}
        />

        <Button
          color="purple"
          size="medium"
          width="auto"
          onClick={handleSubmit(onSubmit)}
        >
          {boardId !== undefined ? "Sauvegarder" : "Créer"}
        </Button>
      </form>
    </div>
  );
}

export default FormBoard;
