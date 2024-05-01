export type TBoard = {
  id: number;
  name: string;
};

export type TColumn = {
  id: number;
  boardId: number;
  name: string;
};

export type TTask = {
  id: number;
  boardId: number;
  columnId: number;
  title: string;
  description: string;
  status: string;
};

export type TSubtask = {
  id: number;
  boardId: number;
  columnId: number;
  taskId: number;
  title: string;
  isCompleted: boolean;
};

export type TFormInputs = {
  name: string;
  [key: string]: string;
};
