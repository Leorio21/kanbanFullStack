import { create } from "zustand";
import type { Board, Column, Subtask, Task } from "../Types/Types";
import boardsJson from "@/data.json";

interface BoardsState {
  dataLoaded: boolean;
  boards: Board[];
  nextBoardIndex: number;
  columns: Column[];
  nextColIndex: number;
  tasks: Task[];
  nextTaskIndex: number;
  subtasks: Subtask[];
  nextsubtaskIndex: number;
  activeBoard: number | null;
  sideBarIsCLosed: boolean;
  activeTask: number | null;
  displayBoardForm: { isOpen: boolean; type: "new" | "modify" | "" };
  displayTaskForm: boolean;
  deleteBoard: () => void;
  changesubtaskStatus: (subtaskId: number, newStatus: boolean) => void;
  deleteTask: () => void;
  openSideBar: () => void;
  changeActiveBoard: (newActiveBoard: number) => void;
  changeActiveTask: (newActiveTask: number | null) => void;
  openBoardForm: (newStatus: boolean, newType?: "new" | "modify" | "") => void;
  openTaskForm: (newStatus: boolean) => void;
}

export const useBoardsStore = create<BoardsState>()((set) => ({
  dataLoaded: false,
  boards: [],
  nextBoardIndex: 0,
  columns: [],
  nextColIndex: 0,
  tasks: [],
  nextTaskIndex: 0,
  subtasks: [],
  nextsubtaskIndex: 0,
  sideBarIsCLosed: false,
  activeBoard: boardsJson.boards.length > 0 ? 0 : null,
  activeTask: null,
  displayBoardForm: { isOpen: false, type: "" },
  displayTaskForm: false,
  deleteBoard: () =>
    set((current) => {
      const newBoards = current.boards.filter(
        (board) => board.id !== current.activeBoard
      );
      return {
        boards: newBoards,
        activeBoard: newBoards.length > 0 ? newBoards[0].id : null,
        columns: current.columns.filter(
          (column) => column.boardId !== current.activeBoard
        ),
        tasks: current.tasks.filter(
          (task) => task.boardId !== current.activeBoard
        ),
        subtasks: current.subtasks.filter(
          (subtask) => subtask.boardId !== current.activeBoard
        ),
      };
    }),
  deleteTask: () =>
    set((current) => ({
      activeTask: null,
      tasks: current.tasks.filter((task) => task.id !== current.activeTask),
      subtasks: current.subtasks.filter(
        (subtask) => subtask.taskId !== current.activeTask
      ),
    })),
  changesubtaskStatus: (subtaskId, newStatus) =>
    set((current) => ({
      subtasks: [
        ...current.subtasks.map((subtask) => {
          if (subtask.id === subtaskId) {
            return { ...subtask, isCompleted: newStatus };
          }
          return subtask;
        }),
      ],
    })),
  openSideBar: () =>
    set((current) => ({
      sideBarIsCLosed: current.sideBarIsCLosed ? false : true,
    })),
  changeActiveBoard: (newActiveBoard) =>
    set(() => ({
      activeBoard: newActiveBoard,
    })),
  changeActiveTask: (newActiveTask) =>
    set(() => ({ activeTask: newActiveTask })),
  openBoardForm: (newStatus: boolean, newType = "") =>
    set(() => ({ displayBoardForm: { isOpen: newStatus, type: newType } })),
  openTaskForm: (newStatus: boolean) =>
    set(() => ({ displayTaskForm: newStatus })),
}));

export const loadData = () => {
  let nextBoardIndex = 0;
  let nextColumnIndex = 0;
  let nextTaskIndex = 0;
  let nextsubtaskIndex = 0;

  const boards: Board[] = [];
  const columns: Column[] = [];
  const tasks: Task[] = [];
  const subtasks: Subtask[] = [];

  boardsJson.boards.map((board) => {
    boards.push({ id: nextBoardIndex, name: board.name });
    board.columns.map((column) => {
      columns.push({
        id: nextColumnIndex,
        boardId: nextBoardIndex,
        name: column.name,
      });
      column.tasks.map((task) => {
        tasks.push({
          id: nextTaskIndex,
          boardId: nextBoardIndex,
          columnId: nextColumnIndex,
          title: task.title,
          description: task.description,
          status: task.status,
        });
        task.subtasks.map((subtask) => {
          subtasks.push({
            id: nextsubtaskIndex++,
            boardId: nextBoardIndex,
            columnId: nextColumnIndex,
            taskId: nextTaskIndex,
            title: subtask.title,
            isCompleted: subtask.isCompleted,
          });
        }),
          nextTaskIndex++;
      }),
        nextColumnIndex++;
    }),
      nextBoardIndex++;
  });

  useBoardsStore.setState(() => ({
    dataLoaded: true,
    boards: boards,
    columns: columns,
    tasks: tasks,
    subtasks: subtasks,
    activeBoard: boards.length > 0 ? 0 : null,
    nextBoardIndex: nextBoardIndex,
    nextColumnIndex: nextColumnIndex,
    nextTaskIndex: nextTaskIndex,
    nextsubtaskIndex: nextsubtaskIndex,
  }));
};
