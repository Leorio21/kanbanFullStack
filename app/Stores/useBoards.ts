import { create } from "zustand";
import type { Board, Column, SubTask, Task } from "../Types/Types";
import boardsJson from "@/data.json";

interface BoardsState {
  dataLoaded: boolean;
  boards: Board[];
  nextBoardIndex: number;
  columns: Column[];
  nextColIndex: number;
  tasks: Task[];
  nextTaskIndex: number;
  subTasks: SubTask[];
  nextSubTaskIndex: number;
  activeBoard: number | null;
  sideBarIsCLosed: boolean;
  activeTask: number | null;

  /*---------- A verif --------------*/
  displayBoardForm: { isOpen: boolean; type: "new" | "modify" | "" };
  displayTaskForm: boolean;
  // addNewBoard: (newboardTitle: string) => void;
  deleteBoard: () => void;
  deleteTask: () => void;
  openCloseSideBar: () => void;
  changeActiveBoard: (newActiveBoard: number) => void;
  changeActiveTask: (newActiveTask: number | null) => void;
  openBoardForm: (newStatus: boolean, newType?: "new" | "modify" | "") => void;
  openTaskForm: (newStatus: boolean) => void;
}

export const useBoardsStore = create<BoardsState>()((set) => ({
  dataLoaded: false,
  boards: [],
  columns: [],
  tasks: [],
  subTasks: [],
  nextBoardIndex: 0,
  nextColIndex: 0,
  nextTaskIndex: 0,
  nextSubTaskIndex: 0,
  sideBarIsCLosed: false,
  activeBoard: boardsJson.boards.length > 0 ? 0 : null,
  activeTask: null,

  displayBoardForm: { isOpen: false, type: "" },
  displayTaskForm: false,
  // addNewBoard: (newboardTitle) =>
  //   set((current) => {
  //     const newBoards = [...current.boards];
  //     newBoards.push({
  //       name: newboardTitle,
  //       columns: [],
  //     });
  //     return { boards: newBoards };
  //   }),
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
        subTasks: current.subTasks.filter(
          (subtask) => subtask.boardId !== current.activeBoard
        ),
      };
    }),
  deleteTask: () =>
    set((current) => ({
      activeTask: null,
      tasks: current.tasks.filter((task) => task.id !== current.activeTask),
      subTasks: current.subTasks.filter(
        (subtask) => subtask.taskId !== current.activeTask
      ),
    })),
  openCloseSideBar: () =>
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
  let nextSubTaskIndex = 0;

  const boards: Board[] = [];
  const columns: Column[] = [];
  const tasks: Task[] = [];
  const subtasks: SubTask[] = [];

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
            id: nextSubTaskIndex++,
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
    subTasks: subtasks,
    activeBoard: boards.length > 0 ? 0 : null,
    nextBoardIndex: nextBoardIndex,
    nextColumnIndex: nextColumnIndex,
    nextTaskIndex: nextTaskIndex,
    nextSubTaskIndex: nextSubTaskIndex,
  }));
};
