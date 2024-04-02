import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Board } from "../Types/Types";
import baordsJson from "@/data.json";

interface BoardsState {
  boards: Board[];
  activeBoard: string | null;
  addNewBoard: (newboardTitle: string) => void;
  changeActiveBoard: (newActiveBoard: string) => void;
}

export const useBoardsStore = create<BoardsState>()(
  persist(
    (set) => ({
      boards: baordsJson.boards,
      activeBoard: baordsJson.boards.length > 0 ? baordsJson.boards[0].name : null,
      addNewBoard: (newboardTitle) =>
        set((current) => {
          const newBoardsList = [...current.boards];
          newBoardsList.push({
            name: newboardTitle,
            columns: [],
          });
          return { boards: newBoardsList };
        }),
      changeActiveBoard: (newActiveBoard) =>
        set(() => ({
          activeBoard: newActiveBoard,
        })),
    }),
    { name: "BoardsStore" }
  )
);
