import React from "react";
import classNames from "classnames";
import styles from "./ButtonProvider.module.css";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";

export const GoogleProviderButton = () => {
  return (
    <button
      className={classNames(styles.button)}
      onClick={() =>
        signIn("google", {
          callbackUrl: process.env.NEXT_PUBLIC_REDIRECTION_URL_ON_LOGIN,
        })
      }
    >
      <FcGoogle size={30} />
      Sign in with Google
    </button>
  );
};

export const GithubProviderButton = () => {
  return (
    <button
      className={classNames(styles.button)}
      onClick={() =>
        signIn("github", {
          callbackUrl: process.env.NEXT_PUBLIC_REDIRECTION_URL_ON_LOGIN,
        })
      }
    >
      <AiFillGithub size={30} />
      Sign in with Github
    </button>
  );
};
