import React from "react";
import { createPortal } from "react-dom";
import classNames from "classnames/bind";
import styles from "./useModal.module.css";

const cx = classNames.bind(styles);

type ModalProps = {
  validateButton?: {
    name: string;
    onClick: () => void;
  } | null;
  cancelButton?: {
    name: string;
  } | null;
};

type ModalButtonProps = {
  name: string;
  onClick?: () => void;
  cancel?: boolean;
};

export const useModal = () => {
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");

  const Modal = {
    show: (message: string) => {
      setMessage(message);
      setOpen(true);
    },
  };

  const ModalButton = ({
    name,
    cancel = false,
    onClick = () => {},
  }: ModalButtonProps) => {
    const onClickHandler = () => {
      setOpen(false);
      onClick();
    };
    return (
      <button
        className={cx("button", { cancel: cancel })}
        onClick={onClickHandler}
      >
        {name}
      </button>
    );
  };

  const ModalContent = ({ validateButton, cancelButton }: ModalProps) => {
    return (
      <div className={cx("container")}>
        <article className={cx("modalContent")}>
          {message}
          <div className={cx("buttonContainer")}>
            {validateButton && (
              <ModalButton
                name={validateButton.name}
                onClick={validateButton.onClick}
              />
            )}
            {cancelButton && <ModalButton name={cancelButton.name} cancel />}
          </div>
        </article>
      </div>
    );
  };

  const ModalDiv = ({
    validateButton = null,
    cancelButton = null,
  }: ModalProps) => {
    return (
      <>
        {open &&
          createPortal(
            <ModalContent
              validateButton={validateButton}
              cancelButton={cancelButton}
            />,
            document.body
          )}
      </>
    );
  };
  return { Modal, ModalDiv };
};
