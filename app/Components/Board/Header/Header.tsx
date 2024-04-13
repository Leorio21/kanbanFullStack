import React from "react";
import classNames from "classnames";
import styles from "./Header.module.css";
import Logo from "./Logo/Logo";
import Menu from "./Menu/Menu";
import { useBoardsStore } from "@/app/Stores/useBoards";

function Header() {
  const activeBoard = useBoardsStore((state) => state.activeBoard);
  return (
    <div className={classNames(styles.container)}>
      <Logo />
      {activeBoard !== null && <Menu />}
    </div>
  );
}

export default Header;
