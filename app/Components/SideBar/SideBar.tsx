import React, { useRef } from "react";
import classNames from "classnames/bind";
import styles from "./SideBar.module.css";
import Menu from "./Menu/Menu";
import { useBoardsStore } from "@/app/Stores/useBoards";

const cx = classNames.bind(styles);

function SideBar() {
  const menuRef = useRef<HTMLDivElement>(null);
  const isSideBarClosed = useBoardsStore((state) => state.isSideBarClosed);
  const closeSideBar = useBoardsStore((state) => state.closeSideBar);

  const closeMenu = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const elementCliked = event.target as HTMLElement;
    if (!menuRef.current?.contains(elementCliked)) {
      closeSideBar(true);
    }
  };

  return (
    <div
      className={cx("container", { close: isSideBarClosed })}
      onClick={closeMenu}
    >
      <Menu ref={menuRef} />
    </div>
  );
}

export default SideBar;
