import React, { useState } from "react";
import { useBoardsStore } from "@/app/Stores/useBoards";
import classNames from "classnames";
import styles from "./Menu.module.css";
import { ElipsisMenu, Item } from "@/app/Components/ElipsisMenu/ElipsisMenu";
import Button from "@/app/Components/Button/Button";
import Delete from "@/app/Components/Delete/Delete";

function Menu() {
  const [isOpenDeleteForm, setIsOpenDeleteForm] = useState(false);
  const activeBoard = useBoardsStore((state) => state.activeBoard);

  const openCloseDeleteForm = (newValue: boolean) => {
    setIsOpenDeleteForm(newValue);
  };

  if (activeBoard) {
    return (
      <div className={classNames(styles.container)}>
        <p className={classNames(styles.title)}>{activeBoard.name}</p>
        <div className={classNames(styles.buttonsContainer)}>
          <Button
            color="purple"
            size="medium"
            disable={activeBoard?.columns.length === 0}
          >
            + Ajouter une tâche
          </Button>
          <ElipsisMenu position="board">
            <Item>Modifer tableau</Item>
            <Item type="delete" onClick={() => openCloseDeleteForm(true)}>
              Supprimer tableau
            </Item>
          </ElipsisMenu>
        </div>
        <Delete isOpen={isOpenDeleteForm} type="board" name={activeBoard.name}>
          <div className={classNames(styles.deleteCancelButtonContainer)}>
            <Button color="red" size="medium" width="max">
              Supprimer
            </Button>
            <Button
              color="white"
              size="medium"
              width="auto"
              onClick={() => openCloseDeleteForm(false)}
            >
              Annuler
            </Button>
          </div>
        </Delete>
      </div>
    );
  }
}

export default Menu;
