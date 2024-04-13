import { create } from "zustand";
import type { Board, Column, Subtask, Task } from "../Types/Types";
import boardsJson from "@/data.json";

interface BoardsState {
  dataLoaded: boolean;
  boards: Board[];
  nextBoardIndex: number;
  columns: Column[];
  nextColumnIndex: number;
  tasks: Task[];
  nextTaskIndex: number;
  subtasks: Subtask[];
  nextsubtaskIndex: number;
  activeBoard: number | null;
  sideBarIsCLosed: boolean;
  activeTask: number | null;
  displayBoardForm: { isOpen: boolean; method: "new" | "modify" | "" };
  displayTaskForm: boolean;
  addNewBoard: (newBoard: { [key: string]: string }) => void;
  modifyBoard: (
    boardModified: { [key: string]: string },
    boardId: number
  ) => void;
  deleteBoard: () => void;
  deleteColumn: (columnIdToDelete: number) => void;
  addTask: (newTask: { [key: string]: string }) => void;
  deleteTask: () => void;
  changesubtaskStatus: (subtaskId: number, newStatus: boolean) => void;
  openSideBar: () => void;
  changeActiveBoard: (newActiveBoard: number) => void;
  changeActiveTask: (newActiveTask: number | null) => void;
  openBoardForm: (
    newStatus: boolean,
    newMethod?: "new" | "modify" | ""
  ) => void;
  openTaskForm: (newStatus: boolean) => void;
}

export const useBoardsStore = create<BoardsState>()((set) => ({
  dataLoaded: false,
  boards: [],
  nextBoardIndex: 0,
  columns: [],
  nextColumnIndex: 0,
  tasks: [],
  nextTaskIndex: 0,
  subtasks: [],
  nextsubtaskIndex: 0,
  sideBarIsCLosed: false,
  activeBoard: boardsJson.boards.length > 0 ? 0 : null,
  activeTask: null,
  displayBoardForm: { isOpen: false, method: "" },
  displayTaskForm: false,
  addNewBoard: (newBoard) =>
    set((current) => {
      const newBoards = [...current.boards];
      const newColumns = [...current.columns];
      let boardId = current.nextBoardIndex;
      let columnId = current.nextColumnIndex;
      for (const field in newBoard) {
        if (field === "boardName") {
          newBoards.push({
            id: boardId++,
            name: newBoard[field],
          });
          continue;
        }
        if (newBoard[field].match(/[\w]/g)) {
          newColumns.push({
            id: columnId++,
            boardId: current.nextBoardIndex,
            name: newBoard[field],
          });
        }
      }
      return {
        activeBoard: current.nextBoardIndex,
        boards: newBoards,
        nextBoardIndex: boardId,
        columns: newColumns,
        nextColumnIndex: columnId,
      };
    }),
  modifyBoard: (boardModified, boardId) =>
    set((current) => {
      const newBoards = [
        ...current.boards.map((board) => {
          if (board.id === boardId) {
            return { ...board, name: boardModified.boardName };
          }
          return board;
        }),
      ];
      const columnsModified = [...current.columns];
      let columnId = current.nextColumnIndex;
      for (const field in boardModified) {
        if (field === "boardName") {
          continue;
        }
        if (boardModified[field].match(/[\w]/g)) {
          const index = columnsModified.findIndex((col) => col.id === +field);
          if (index >= 0) {
            columnsModified[index] = {
              ...columnsModified[index],
              name: boardModified[field],
            };
          } else {
            columnsModified.push({
              id: columnId++,
              boardId: boardId,
              name: boardModified[field],
            });
          }
        }
      }
      console.log(columnsModified);
      return {
        boards: newBoards,
        columns: columnsModified,
        nextColumnIndex: columnId,
      };
    }),
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
  deleteColumn: (columnIdToDelete: number) =>
    set((current) => ({
      columns: [
        ...current.columns.filter((column) => column.id !== columnIdToDelete),
      ],
      tasks: [
        ...current.tasks.filter((task) => task.columnId !== columnIdToDelete),
      ],
      subtasks: [
        ...current.subtasks.filter(
          (subtask) => subtask.columnId !== columnIdToDelete
        ),
      ],
    })),
  addTask: (newTask) =>
    set((current) => {
      let taskId = current.nextTaskIndex;
      let subtaskId = current.nextsubtaskIndex;
      const taskToAdd: Task = {
        id: taskId,
        boardId: current.activeBoard !== null ? current.activeBoard : 0,
        columnId: Number(newTask["colId"]),
        title: newTask["taskName"],
        description: newTask["description"],
        status: newTask["status"],
      };
      const newSubtasks = [...current.subtasks];
      for (const field in newTask) {
        if (
          field === "taskName" ||
          field === "description" ||
          field === "status" ||
          field === "colId"
        ) {
          continue;
        }
        if (newTask[field].match(/[\w]/g)) {
          newSubtasks.push({
            id: subtaskId++,
            boardId: current.nextBoardIndex,
            columnId: Number(newTask["colId"]),
            taskId: taskId,
            title: newTask[field],
            isCompleted: false,
          });
        }
      }
      taskId++;
      return {
        tasks: [...current.tasks, taskToAdd],
        nextTaskIndex: taskId,
        subtasks: newSubtasks,
        nextsubtaskIndex: subtaskId,
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
  openBoardForm: (newStatus: boolean, newMethod = "") =>
    set(() => ({ displayBoardForm: { isOpen: newStatus, method: newMethod } })),
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
