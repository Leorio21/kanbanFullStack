import React from "react";
import classNames from "classnames";
import styles from "./ThemeSelector.module.css";
import Image from "next/image";
import sunSvg from "../../../../public/assets/icon-light-theme.svg";
import moonSvg from "../../../../public/assets/icon-dark-theme.svg";
import Switch from "./Switch/Switch";

function ThemeSelector() {
  return (
    <div className={classNames(styles.container)}>
      <Image src={sunSvg} alt="Light mode" width={20} height={20} />
      <Switch />
      <Image src={moonSvg} alt="Dark mode" width={20} height={20} />
    </div>
  );
}

export default ThemeSelector;
