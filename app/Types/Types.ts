export type Board = {
  name: string;
  columns: {
    name: string;
    tasks: {
      title: string;
      description: string;
      status: string;
      subtasks: {
        title: string;
        isCompleted: boolean;
      }[];
    }[];
  }[];
};

export type Column = {
  name: string;
  tasks: {
    title: string;
    description: string;
    status: string;
    subtasks: {
      title: string;
      isCompleted: boolean;
    }[];
  }[];
};

export type Task = {
  title: string;
    description: string;
    status: string;
    subtasks: {
      title: string;
      isCompleted: boolean;
    }[];
}
