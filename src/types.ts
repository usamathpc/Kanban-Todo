export enum TodoListType {
  TODO = "TODO",
  IN_PROGRESS = "IN_PROGRESS",
  DONE = "DONE",
}

export interface TodoCardType {
  id: string;
  title: string;
  description: string;
  type: TodoListType;
  createdAt: string;
}
