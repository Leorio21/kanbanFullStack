import React from "react";
import classNames from "classnames";
import styles from "./Empty.module.css";
import Button from "@/app/Components/Button/Button";

function Empty() {
  return (
    <div className={classNames(styles.container)}>
      <p>Ce tableau est vide. Créer une colonne pour commencer.</p>
      <Button color="purple" size="large">
        + Ajouter une colonne
      </Button>
    </div>
  );
}

export default Empty;
