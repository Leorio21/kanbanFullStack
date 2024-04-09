import React, { useState } from "react";
import classNames from "classnames";
import styles from "./InputList.module.css";
import Input from "../Input/Input";
import Button from "../../Button/Button";

type InputListProps = {
  title: string;
};

function InputList({ title }: InputListProps) {
  const [inputs, setInputs] = useState([
    { id: 0, jsx: <Input type="text" /> },
    { id: 1, jsx: <Input type="text" /> },
  ]);
  const [nextId, setNextId] = useState(2);

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
      <div className={classNames(styles.columnsInput)}>
        {title}
        {inputs.map((input, index) => (
          <span key={input.id} className={classNames(styles.columnInput)}>
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
        + Ajouter une colonne
      </Button>
    </>
  );
}

export default InputList;
