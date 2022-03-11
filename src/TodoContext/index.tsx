import React, { useState } from "react";
import { TodoCardType, TodoListType } from "../types";
import { v4 as uuidv4 } from "uuid";
import { DateTime } from "luxon";

interface TodoContextType {
  todoCards: TodoCardType[];
  inProgressCards: TodoCardType[];
  doneCards: TodoCardType[];
  addToDoCard: (isAdd: boolean, type: TodoListType, card: TodoCardType) => void;
  handleOpenAddEditTodoModal: (
    isAdd: boolean,
    todoId: string,
    title: string,
    description: string,
    type: TodoListType,
    createdAt: string
  ) => void;
  handleCloseAddEditTodoModal: () => void;
  handleClearDoneCards: () => void;
  handleDeleteTodoCard: (todoId: string, type: TodoListType) => void;
  setInProgressCards: (cards: TodoCardType[]) => void;
  addEditTodoModalProps: {
    isAdd: boolean;
    isOpen: boolean;
    todoId: string;
    title: string;
    type: TodoListType;
    description: string;
    createdAt: string;
  };
}

export const TodoContext = React.createContext<TodoContextType>(null!);

export const TodoProvider = ({ children }: { children: React.ReactNode }) => {
  const [addEditTodoModalProps, setAddEditTodoModalProps] = React.useState({
    isAdd: true,
    isOpen: false,
    todoId: "",
    title: "",
    type: TodoListType.TODO,
    description: "",
    createdAt: "",
  });

  const [todoCards, setTodoCards] = useState<TodoCardType[]>([
    {
      id: uuidv4(),
      title: "Demo Todo",
      description: "Demo Description",
      type: TodoListType.TODO,
      createdAt: DateTime.now().toISO(),
    },
  ]);
  const [inProgressCards, setInProgressCards] = useState<TodoCardType[]>([
    {
      id: uuidv4(),
      title: "Demo In Progress",
      description: "Demo Description",
      type: TodoListType.IN_PROGRESS,
      createdAt: DateTime.now().toISO(),
    },
  ]);
  const [doneCards, setDoneCards] = useState<TodoCardType[]>([
    {
      id: uuidv4(),
      title: "Demo Done",
      description: "Demo Description",
      type: TodoListType.DONE,
      createdAt: DateTime.now().toISO(),
    },
  ]);

  const addToDoCard = (
    isAdd: boolean,
    type: TodoListType,
    newCard: TodoCardType
  ) => {
    if (isAdd) {
      setTodoCards([...todoCards, newCard]);
    } else {
      if (type === TodoListType.TODO) {
        const updatedTodoCards = todoCards.map((card) => {
          if (card.id === newCard.id) {
            return newCard;
          }
          return card;
        });
        setTodoCards(updatedTodoCards);
      } else if (type === TodoListType.IN_PROGRESS) {
        const updatedInProgressCards = inProgressCards.map((card) => {
          if (card.id === newCard.id) {
            return newCard;
          }
          return card;
        });
        setInProgressCards(updatedInProgressCards);
      } else if (type === TodoListType.DONE) {
        const updatedDoneCards = doneCards.map((card) => {
          if (card.id === newCard.id) {
            return newCard;
          }
          return card;
        });
        setDoneCards(updatedDoneCards);
      }
    }
  };

  const handleOpenAddEditTodoModal = (
    isAdd: boolean,
    todoId: string,
    title: string,
    description: string,
    type: TodoListType,
    createdAt: string
  ) => {
    setAddEditTodoModalProps({
      isOpen: true,
      isAdd,
      todoId,
      title,
      description,
      type,
      createdAt,
    });
  };
  const handleCloseAddEditTodoModal = () => {
    setAddEditTodoModalProps({
      isAdd: true,
      isOpen: false,
      todoId: "",
      title: "",
      type: TodoListType.TODO,
      description: "",
      createdAt: "",
    });
  };

  const handleClearDoneCards = () => {
    setDoneCards([]);
  };

  const handleDeleteTodoCard = (todoId: string, type: TodoListType) => {
    if (type === TodoListType.TODO) {
      const updatedTodoCards = todoCards.filter((card) => card.id !== todoId);
      setTodoCards(updatedTodoCards);
    } else if (type === TodoListType.IN_PROGRESS) {
      const updatedInProgressCards = inProgressCards.filter(
        (card) => card.id !== todoId
      );
      setInProgressCards(updatedInProgressCards);
    } else if (type === TodoListType.DONE) {
      const updatedDoneCards = doneCards.filter((card) => card.id !== todoId);
      setDoneCards(updatedDoneCards);
    }
  };

  let value = {
    todoCards,
    inProgressCards,
    doneCards,
    addToDoCard,
    handleOpenAddEditTodoModal,
    handleCloseAddEditTodoModal,
    handleClearDoneCards,
    setInProgressCards,
    addEditTodoModalProps,
    handleDeleteTodoCard,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};
