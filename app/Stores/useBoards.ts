import { create } from "zustand";
import type { Board, Column, Task } from "../Types/Types";
import boardsJson from "@/data.json";

interface BoardsState {
  boards: Board[];
  sideBarIsCLosed: boolean;
  activeBoardName: string | null;
  activeBoard: Board | null;
  activeColumnsName: string[];
  activeColumns: Column[];
  activeTask: Task | null;
  displayAddBoardForm: { isOpen: boolean; type: "new" | "modify" | "" };
  displayAddTaskForm: boolean;
  addNewBoard: (newboardTitle: string) => void;
  deleteBoard: (nameOfBoardToDelete: string) => void;
  openCloseSideBar: () => void;
  changeActiveBoard: (newActiveBoard: Board) => void;
  changeActiveTask: (newActiveTask: Task | null) => void;
  openBoardForm: (newStatus: boolean, newType?: "new" | "modify" | "") => void;
  openTaskForm: (newStatus: boolean) => void;
}

export const useBoardsStore = create<BoardsState>()((set) => ({
  boards: boardsJson.boards,
  sideBarIsCLosed: false,
  activeBoardName:
    boardsJson.boards.length > 0 ? boardsJson.boards[0].name : null,
  activeBoard: boardsJson.boards.length > 0 ? boardsJson.boards[0] : null,
  activeColumnsName:
    boardsJson.boards.length > 0 && boardsJson.boards[0].columns.length > 0
      ? [...boardsJson.boards[0].columns.map((col) => col.name)]
      : [],
  activeColumns:
    boardsJson.boards.length > 0 && boardsJson.boards[0].columns.length > 0
      ? [...boardsJson.boards[0].columns]
      : [],
  activeTask: null,
  displayAddBoardForm: { isOpen: false, type: "" },
  displayAddTaskForm: false,
  addNewBoard: (newboardTitle) =>
    set((current) => {
      const newBoards = [...current.boards];
      newBoards.push({
        name: newboardTitle,
        columns: [],
      });
      return { boards: newBoards };
    }),
  deleteBoard: (nameOfBoardToDelete) =>
    set((current) => ({
      boards: current.boards.filter(
        (board) => board.name !== nameOfBoardToDelete
      ),
      activeBoardName: null,
      activeBoard: null,
      activeColumnsName: [],
      activeColumns: [],
    })),
  openCloseSideBar: () =>
    set((current) => ({
      sideBarIsCLosed: current.sideBarIsCLosed ? false : true,
    })),
  changeActiveBoard: (newActiveBoard) =>
    set(() => ({
      activeBoardName: newActiveBoard.name,
      activeBoard: newActiveBoard,
      activeColumnsName: [...newActiveBoard.columns.map((col) => col.name)],
      activeColumns: [...newActiveBoard.columns],
    })),
  changeActiveTask: (newActiveTask) =>
    set(() => ({ activeTask: newActiveTask })),
  openBoardForm: (newStatus: boolean, newType = "") =>
    set(() => ({ displayAddBoardForm: { isOpen: newStatus, type: newType } })),
  openTaskForm: (newStatus: boolean) =>
    set(() => ({ displayAddTaskForm: newStatus })),
}));
