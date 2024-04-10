export type Board = {
  id: number;
  name: string;
};

export type Column = {
  id: number;
  boardId: number;
  name: string;
};

export type Task = {
  id: number;
  columnId: number;
  title: string;
  description: string;
  status: string;
};

export type SubTask = {
  id: number;
  taskId: number;
  title: string;
  isCompleted: boolean;
};
