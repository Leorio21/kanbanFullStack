import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";
import styles from "./StatusList.module.css";
import { useBoardsStore } from "@/app/Stores/useBoards";

const cx = classNames.bind(styles);

type StatusListProps = {
  status?: string;
};

function StatusList({ status }: StatusListProps) {
  const statusRef = useRef<HTMLDivElement>(null);
  const [isOpenStatusList, setIsOpenStatusList] = useState(false);
  const columnsName = useBoardsStore((state) =>
    state.columns.filter((column) => column.boardId === state.activeBoard)
  );
  const activeTask = useBoardsStore((state) => state.activeTask);

  const closeStatusList = () => {
    setIsOpenStatusList((current) => !current);
  };

  useEffect(() => {
    if (statusRef.current) {
      statusRef.current.addEventListener("mouseleave", () => {
        setIsOpenStatusList(false);
      });
    }
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      statusRef.current?.removeEventListener;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTask]);

  return (
    <div ref={statusRef} className={cx("statusContainer")}>
      <p className={cx("subTitle")}>Status Actuel</p>
      <p
        className={cx("currentStatus", "button", {
          currentStatusActive: isOpenStatusList,
        })}
        onClick={closeStatusList}
      >
        <span>{status ? status : columnsName[0].name}</span>
        <svg
          className={cx("chevron", {
            rotateChevron: isOpenStatusList,
          })}
          width="10"
          height="7"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path stroke="#635FC7" strokeWidth="2" fill="none" d="M9 6 5 2 1 6" />
        </svg>
      </p>
      <div className={cx("statusList", { hidden: !isOpenStatusList })}>
        {columnsName.map((column) => (
          <p key={column.id} className={cx("statusListItem")}>
            {column.name}
          </p>
        ))}
      </div>
    </div>
  );
}

export default StatusList;
