"use client";
import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import styles from "./Switch.module.css";

function Switch() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  

  const onClickHandler = () => {
    const body = document.querySelector("body");
    if (cursorRef.current !== null && body !== null) {
      if (cursorRef.current.classList.contains(styles.dark)) {
        cursorRef.current.classList.remove(styles.dark);
        body.classList.remove("theme-dark");
        body.classList.add("theme-light")
      } else {
        cursorRef.current.classList.add(styles.dark);
        body.classList.remove("theme-light")
        body.classList.add("theme-dark");
      }
    }
  };

  useEffect(() => {
    onClickHandler();
  }, [isDarkMode])

  useEffect(() => {
    if (window && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDarkMode(true)
    }
    onClickHandler();
  }, [])

  return (
    <div className={classNames(styles.container)} onClick={onClickHandler}>
      <div ref={cursorRef} className={classNames(styles.cursor)}></div>
    </div>
  );
}

export default Switch;
