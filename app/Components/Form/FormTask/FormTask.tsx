import React, { useRef } from "react";
import classNames from "classnames";
import styles from "./FormTask.module.css";
import { useBoardsStore } from "@/app/Stores/useBoards";
import Button from "../Components/Button/Button";
import StatusList from "../../StatusList/StatusList";
import Input from "../Components/Input/Input";
import TextArea from "../Components/TextArea/TextArea";
import InputList from "../Components/InputList/InputList";

type FormTaskProps = {
  taskId?: number;
};

function FormTask({ taskId }: FormTaskProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const task = useBoardsStore((state) =>
    state.tasks.filter((task) => task.id === taskId)
  );
  // const columns = useBoardsStore((state) =>
  //   state.columns.filter((column) => column.taskId === state.activeBoard)
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
          {taskId ? "Modifier la tâche" : "Ajouter une nouvelle tâche"}
        </p>
        <Input
          label="Nom de la tâche"
          type="text"
          name="boardName"
          placeholder="ex : Faire une pause café"
          content={task.length > 0 ? task[0].title : undefined}
        />
        <TextArea
          label="Description"
          name="boardName"
          rows={5}
          placeholder="ex : C'est toujours bon de faire un break. Une pause de 15min pour recharger les batteries."
          content={task.length > 0 ? task[0].description : undefined}
        />
        <InputList
          title="Sous-tâches"
          type="subtask"
          placeHolder={["ex: Faire le café", "ex: Boire un café et sourire"]}
        />
        <StatusList />
        <Button color="purple" size="medium" width="auto">
          {taskId ? "Sauvegarder" : "Créer"}
        </Button>
      </form>
    </div>
  );
}

export default FormTask;
