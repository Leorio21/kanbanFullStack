import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Board } from "../Types/Types";
import boardsJson from "@/data.json";

interface BoardsState {
  boards: Board[];
  sideBarIsCLosed: boolean;
  activeBoardName: string | null;
  activeBoard: Board | null;
  addNewBoard: (newboardTitle: string) => void;
  openCloseSideBar: () => void;
  changeActiveBoard: (newActiveBoard: Board) => void;
}

export const useBoardsStore = create<BoardsState>()(
  persist(
    (set) => ({
      boards: boardsJson.boards,
      sideBarIsCLosed: false,
      activeBoardName:
        boardsJson.boards.length > 0 ? boardsJson.boards[0].name : null,
      activeBoard: boardsJson.boards.length > 0 ? boardsJson.boards[0] : null,
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
        })),
    }),
    { name: "BoardsStore" }
  )
);
