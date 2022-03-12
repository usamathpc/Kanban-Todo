export enum TodoListType {
  TODO = "TODO",
  IN_PROGRESS = "IN_PROGRESS",
  DONE = "DONE",
}

export interface CardType {
  id: string;
  title: string;
  description: string;
  type: TodoListType;
  createdAt: string;
}

export interface ListData {
  title: string;
  cards: CardType[];
  type: TodoListType;
}

export interface ListType {
  [TodoListType.TODO]: ListData;
  [TodoListType.IN_PROGRESS]: ListData;
  [TodoListType.DONE]: ListData;
}
