export interface TodoType {
  _id: string;
  name: string;
  description: string;
  completed: boolean;
}

export type ArrayTodo = TodoType[];
