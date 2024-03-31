import React, { ComponentPropsWithoutRef, useState } from "react";
import classNames from "classnames";
import styles from "./ToggleSideBar.module.css";
import Image from "next/image";
import closeEye from "../../../../public/assets/icon-hide-sidebar.svg";
import openEye from "../../../../public/assets/icon-show-sidebar.svg";

type ToggleSideBarProps = {
  isOpen: boolean;
} & ComponentPropsWithoutRef<"div">;

function ToggleSideBar({ isOpen, ...props }: ToggleSideBarProps) {
  if (isOpen === false) {
    return (
      <div className={classNames(`${styles.container} ${styles.open}`)}>
        <div className={classNames(`${styles.content}`)} {...props}>
          <Image src={closeEye} alt="Close sideBar" width={20} height={18} />
          Masquer
        </div>
      </div>
    );
  }

  return (
    <div
      className={classNames(`${styles.container} ${styles.close}`)}
      {...props}
    >
      <div className={classNames(`${styles.content}`)}>
        <Image src={openEye} alt="Open sideBar" width={20} height={18} />
      </div>
    </div>
  );
}

export default ToggleSideBar;
