"use client";
import React from "react";
import {
  GoogleProviderButton,
  GithubProviderButton,
} from "@/app/Components/Auth/ButtonProvider/ButtonProvider";
import classNames from "classnames";
import styles from "./page.module.css";

const page = () => {
  return (
    <section className={classNames(styles.container)}>
      <h1>Sign in</h1>
      <div className={classNames(styles.buttonContainer)}>
        <GoogleProviderButton />
        <GithubProviderButton />
      </div>
    </section>
  );
};

export default page;
