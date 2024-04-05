"use client";
import React, {
  ComponentPropsWithoutRef,
  useEffect,
  useRef,
  useState,
} from "react";
import classNames from "classnames/bind";
import styles from "./ElipsisMenu.module.css";

const cx = classNames.bind(styles);

type ElipsisMenuProps = {
  position: string;
} & ComponentPropsWithoutRef<"div">;

type ItemProps = {
  type?: string;
} & ComponentPropsWithoutRef<"div">;

export function ElipsisMenu({ position, children }: ElipsisMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const subMenuRef = useRef<HTMLDivElement>(null);
  const [subMenuIsOpen, setSubMenuIsOpen] = useState(false);

  const openCloseSubMenu = (
    event: React.MouseEvent<HTMLDivElement | SVGElement, MouseEvent>
  ) => {
    const elementClicked = event?.target as HTMLDivElement;
    if (!subMenuIsOpen || !subMenuRef.current?.contains(elementClicked)) {
      setSubMenuIsOpen((current) => !current);
    }
  };

  useEffect(() => {
    if (menuRef.current) {
      menuRef.current.addEventListener("mouseleave", () => {
        setSubMenuIsOpen(false);
      });
    }
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      menuRef.current?.removeEventListener;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <svg
        width="30"
        height="20"
        viewBox="-7.692 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
        className={cx("button")}
        onClick={openCloseSubMenu}
      >
        <g fill="#828FA3" fillRule="evenodd">
          <circle cx="2.308" cy="2.308" r="2.308" />
          <circle cx="2.308" cy="10" r="2.308" />
          <circle cx="2.308" cy="17.692" r="2.308" />
        </g>
      </svg>
      <div
        ref={menuRef}
        className={cx("container", { hide: !subMenuIsOpen })}
        onClick={openCloseSubMenu}
      >
        <div ref={subMenuRef} className={cx("subMenuContainer", position)}>
          {children}
        </div>
      </div>
    </>
  );
}

export function Item({ children, type = "standard", ...props }: ItemProps) {
  return (
    <div className={cx("link", type)} {...props}>
      {children}
    </div>
  );
}
