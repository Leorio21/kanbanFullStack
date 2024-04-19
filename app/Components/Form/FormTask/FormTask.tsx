import React, { useRef, useState } from "react";
import classNames from "classnames";
import styles from "./FormTask.module.css";
import { useForm, SubmitHandler } from "react-hook-form";
import { useBoardsStore } from "@/app/Stores/useBoards";
import Button from "../Components/Button/Button";
import StatusList from "../../StatusList/StatusList";
import Input from "../Components/Input/Input";
import TextArea from "../Components/TextArea/TextArea";
import InputList from "../Components/InputList/InputList";
import type { FormInputs } from "@/app/Types/Types";
import BackDrop from "../../BackDrop/BackDrop";

type FormTaskProps = {
  taskId?: number;
};

function FormTask({ taskId }: FormTaskProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();
  const task = useBoardsStore((state) =>
    state.tasks.filter((task) => task.id === taskId)
  );
  const subtasks = useBoardsStore((state) =>
    state.subtasks.filter((subtask) => subtask.taskId === taskId)
  );

  const addTask = useBoardsStore((state) => state.addTask);
  const openTaskForm = useBoardsStore((state) => state.openTaskForm);
  const modifyTask = useBoardsStore((state) => state.modifyTask);
  const deleteSubtasks = useBoardsStore((state) => state.deleteSubtasks);

  const [subtaskIdToDelete, setSubtaskIdToDelete] = useState<number[]>([]);

  const addIdToDelete = (idToAdd: number) => {
    setSubtaskIdToDelete((current) => [...current, idToAdd]);
  };

  const closeForm = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const elementCliked = event.target as HTMLElement;
    if (!formRef.current?.contains(elementCliked)) {
      openTaskForm(false);
    }
  };

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    if (taskId !== undefined) {
      modifyTask(data, taskId);
      subtaskIdToDelete.forEach((id) => deleteSubtasks(id));
      openTaskForm(false);
    } else {
      addTask(data);
      openTaskForm(false);
    }
  };

  return (
    <BackDrop onClick={closeForm} onSubmit={handleSubmit(onSubmit)}>
      <form ref={formRef} className={classNames(styles.formContainer)}>
        <p className={classNames(styles.title)}>
          {taskId !== undefined
            ? "Modifier la tâche"
            : "Ajouter une nouvelle tâche"}
        </p>
        <Input
          label="Nom de la tâche"
          type="text"
          fieldName="taskName"
          register={register}
          errors={errors}
          notNull={true}
          placeholder="ex : Faire une pause café"
          content={task.length > 0 ? task[0].title : undefined}
        />
        <TextArea
          label="Description"
          fieldName="description"
          register={register}
          errors={errors}
          rows={5}
          placeholder="ex : C'est toujours bon de faire un break. Une pause de 15min pour recharger les batteries."
          content={task.length > 0 ? task[0].description : undefined}
        />
        <InputList
          title="Sous-tâches"
          type="subtask"
          register={register}
          errors={errors}
          addIdToDelete={addIdToDelete}
          subtasks={taskId !== undefined ? subtasks : undefined}
          placeHolder={["ex: Faire le café", "ex: Boire un café et sourire"]}
        />
        <StatusList
          register={register}
          setValue={setValue}
          status={task.length > 0 ? task[0].status : undefined}
          taskColumnId={task.length > 0 ? task[0].columnId : undefined}
        />
        <Button
          color="purple"
          size="medium"
          width="max"
          onClick={handleSubmit(onSubmit)}
        >
          {taskId !== undefined ? "Sauvegarder" : "Créer"}
        </Button>
      </form>
    </BackDrop>
  );
}

export default FormTask;
