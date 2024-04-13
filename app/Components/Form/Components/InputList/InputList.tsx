import React, { useState } from "react";
import classNames from "classnames";
import styles from "./InputList.module.css";
import Input from "../Input/Input";
import Button from "../Button/Button";
import type { Column, FormInputs, Subtask } from "@/app/Types/Types";
import { FieldErrors, UseFormRegister } from "react-hook-form";

type InputListProps = {
  register: UseFormRegister<FormInputs>;
  errors: FieldErrors<FormInputs>;
  title: string;
  type: "column" | "subtask";
  columns?: Column[];
  subtasks?: Subtask[];
  placeHolder?: string[];
  addIdToDelete: (idToDelete: number) => void;
};

function InputList({
  title,
  type,
  register,
  errors,
  columns,
  subtasks,
  placeHolder,
  addIdToDelete,
}: InputListProps) {
  const buttonText = {
    column: "+ Ajouter une colonne",
    subtask: "+ Ajouter une sous-tâche",
  };
  const loadInputValue = (): {
    id: string | number;
    index: number;
    jsx: React.JSX.Element;
  }[] => {
    if (columns) {
      return columns.map((column, index) => {
        return {
          id: column.id,
          index: index,
          jsx: (
            <span key={column.id} className={classNames(styles.input)}>
              <Input
                fieldName={column.id.toString()}
                register={register}
                errors={errors}
                type="text"
                content={column.name}
              />
              <svg
                width="15"
                height="15"
                className={classNames(styles.button)}
                xmlns="http://www.w3.org/2000/svg"
                onClick={() => deleteColumnInput(index, column.id)}
              >
                <g fill="#828FA3" fillRule="evenodd">
                  <path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z" />
                  <path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z" />
                </g>
              </svg>
            </span>
          ),
        };
      });
    }
    if (subtasks) {
      return subtasks.map((subtask, index) => {
        return {
          id: subtask.id,
          index: index,
          jsx: (
            <span key={subtask.id} className={classNames(styles.input)}>
              <Input
                fieldName={subtask.id.toString()}
                register={register}
                errors={errors}
                type="text"
                content={subtask.title}
              />
              <svg
                width="15"
                height="15"
                className={classNames(styles.button)}
                xmlns="http://www.w3.org/2000/svg"
                onClick={() => deleteColumnInput(index, subtask.id)}
              >
                <g fill="#828FA3" fillRule="evenodd">
                  <path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z" />
                  <path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z" />
                </g>
              </svg>
            </span>
          ),
        };
      });
    }
    return [
      {
        id: `newInput${0}`,
        index: 0,
        jsx: (
          <span key={`newInput${0}`} className={classNames(styles.input)}>
            <Input
              fieldName={`newInput${0}`}
              register={register}
              errors={errors}
              type="text"
              placeholder={placeHolder ? placeHolder[0] : ""}
            />
            <svg
              width="15"
              height="15"
              className={classNames(styles.button)}
              xmlns="http://www.w3.org/2000/svg"
              onClick={() => deleteColumnInput(0)}
            >
              <g fill="#828FA3" fillRule="evenodd">
                <path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z" />
                <path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z" />
              </g>
            </svg>
          </span>
        ),
      },
      {
        id: `newInput${1}`,
        index: 1,
        jsx: (
          <span key={`newInput${1}`} className={classNames(styles.input)}>
            <Input
              fieldName={`newInput${1}`}
              register={register}
              errors={errors}
              type="text"
              placeholder={placeHolder ? placeHolder[1] : ""}
            />
            <svg
              width="15"
              height="15"
              className={classNames(styles.button)}
              xmlns="http://www.w3.org/2000/svg"
              onClick={() => deleteColumnInput(1)}
            >
              <g fill="#828FA3" fillRule="evenodd">
                <path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z" />
                <path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z" />
              </g>
            </svg>
          </span>
        ),
      },
    ];
  };

  const [inputs, setInputs] = useState(loadInputValue());
  const [nextIndex, setNextIndex] = useState(inputs.length);

  const addColumnInput = () => {
    setInputs((current) => [
      ...current,
      {
        id: `newInput${nextIndex}`,
        index: nextIndex,
        jsx: (
          <span
            key={`newInput${nextIndex}`}
            className={classNames(styles.input)}
          >
            <Input
              fieldName={`newInput${nextIndex}`}
              register={register}
              errors={errors}
              type="text"
            />
            <svg
              width="15"
              height="15"
              className={classNames(styles.button)}
              xmlns="http://www.w3.org/2000/svg"
              onClick={() => deleteColumnInput(nextIndex)}
            >
              <g fill="#828FA3" fillRule="evenodd">
                <path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z" />
                <path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z" />
              </g>
            </svg>
          </span>
        ),
      },
    ]);
    setNextIndex((current) => current + 1);
  };

  const deleteColumnInput = (indexToDelete: number, id?: number) => {
    if (id !== undefined) {
      addIdToDelete(id);
    }
    setInputs((current) => {
      return [...current.filter((input) => input.index !== indexToDelete)];
    });
  };

  return (
    <>
      <div className={classNames(styles.inputList)}>
        {title}
        {inputs.map((input) => input.jsx)}
      </div>
      <Button color="white" size="medium" width="auto" onClick={addColumnInput}>
        {buttonText[type]}
      </Button>
    </>
  );
}

export default InputList;
