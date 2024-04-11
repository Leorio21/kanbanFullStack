import React, { useState } from "react";
import classNames from "classnames";
import styles from "./InputList.module.css";
import Input from "../Input/Input";
import Button from "../Button/Button";
import { Column, subtask } from "@/app/Types/Types";

type InputListProps = {
  title: string;
  type: "column" | "subtask";
  columns?: Column[];
  subtasks?: subtask[];
  placeHolder?: string[];
};

function InputList({
  title,
  type,
  columns,
  subtasks,
  placeHolder,
}: InputListProps) {
  const buttonText = {
    column: "+ Ajouter une colonne",
    subtask: "+ Ajouter une sous-tâche",
  };
  const loadInputValue = () => {
    if (columns) {
      return columns.map((column) => {
        return {
          id: column.id,
          jsx: <Input type="text" content={column.name} />,
        };
      });
    }
    if (subtasks) {
      return subtasks.map((subtask) => {
        return {
          id: subtask.id,
          jsx: <Input type="text" content={subtask.title} />,
        };
      });
    }
    return [
      {
        id: 0,
        jsx: (
          <Input type="text" placeholder={placeHolder ? placeHolder[0] : ""} />
        ),
      },
      {
        id: 1,
        jsx: (
          <Input type="text" placeholder={placeHolder ? placeHolder[1] : ""} />
        ),
      },
    ];
  };

  const [inputs, setInputs] = useState(loadInputValue());
  const [nextId, setNextId] = useState(inputs.length);

  const addColumnInput = () => {
    setInputs((current) => [
      ...current,
      { id: nextId, jsx: <Input type="text" /> },
    ]);
    setNextId((current) => current + 1);
  };

  const deleteColumnInput = (indexToDelete: number) => {
    setInputs((current) => {
      const newInputList = [...current];
      newInputList.splice(indexToDelete, 1);
      return newInputList;
    });
  };

  return (
    <>
      <div className={classNames(styles.inputList)}>
        {title}
        {inputs.map((input, index) => (
          <span key={input.id} className={classNames(styles.input)}>
            {input.jsx}{" "}
            <svg
              width="15"
              height="15"
              className={classNames(styles.button)}
              xmlns="http://www.w3.org/2000/svg"
              onClick={() => deleteColumnInput(index)}
            >
              <g fill="#828FA3" fillRule="evenodd">
                <path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z" />
                <path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z" />
              </g>
            </svg>
          </span>
        ))}
      </div>
      <Button color="white" size="medium" width="auto" onClick={addColumnInput}>
        {buttonText[type]}
      </Button>
    </>
  );
}

export default InputList;
