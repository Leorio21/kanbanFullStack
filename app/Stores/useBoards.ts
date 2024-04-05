import { create } from "zustand";
import type { Board, Column } from "../Types/Types";
import boardsJson from "@/data.json";

interface BoardsState {
  boards: Board[];
  sideBarIsCLosed: boolean;
  activeBoardName: string | null;
  activeBoard: Board | null;
  activeColumnsName: string[];
  activeColumns: Column[];
  addNewBoard: (newboardTitle: string) => void;
  openCloseSideBar: () => void;
  changeActiveBoard: (newActiveBoard: Board) => void;
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
  addNewBoard: (newboardTitle) =>
    set((current) => {
      const newBoardsList = [...current.boards];
      newBoardsList.push({
        name: newboardTitle,
        columns: [],
      });
      return { boards: newBoardsList };
    }),
  openCloseSideBar: () =>
    set((current) => ({
      sideBarIsCLosed: current.sideBarIsCLosed ? false : true,
    })),
  changeActiveBoard: (newActiveBoard) =>
    set(() => ({
      activeBoardName: newActiveBoard.name,
      activeBoard: newActiveBoard,
      activeColumnsName: [...newActiveBoard.columns.map((col) => col.name)],
      activeColumns: [...newActiveBoard.columns]
    })),
}));
