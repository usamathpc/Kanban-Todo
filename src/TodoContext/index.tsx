import React from "react";
import { CardType, ListType, TodoListType } from "../types";
import { v4 as uuidv4 } from "uuid";
import { DateTime } from "luxon";

interface TodoContextType {
  lists: ListType;
  setLists: React.Dispatch<React.SetStateAction<ListType>>;
  addToDoCard: (isAdd: boolean, type: TodoListType, card: CardType) => void;
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
  handleDeleteTodoCard: (todoId: string, type?: TodoListType) => void;
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

  const [lists, setLists] = React.useState<ListType>({
    [TodoListType.TODO]: {
      title: "To Do",
      type: TodoListType.TODO,
      cards: [
        {
          id: uuidv4(),
          title: "NextJS/HTML/CSS",
          description:
            "Create website with design mockup. Move card to the Progress pane to mark it as in progress!",
          type: TodoListType.TODO,
          createdAt: DateTime.now().toISO(),
        },
      ],
    },
    [TodoListType.IN_PROGRESS]: {
      title: "In Progress",
      type: TodoListType.IN_PROGRESS,
      cards: [
        {
          id: uuidv4(),
          title: "React Native Mobile App",
          description:
            "Develop a RN mobile app. Drag this card to the Done pane to mark it as done! 🎉 ",
          type: TodoListType.IN_PROGRESS,
          createdAt: DateTime.now().toISO(),
        },
      ],
    },
    [TodoListType.DONE]: {
      title: "Done",
      type: TodoListType.DONE,
      cards: [
        {
          id: uuidv4(),
          title: "Todo List App",
          description: "Build a Todo List App with ReactJS",
          type: TodoListType.DONE,

          createdAt: DateTime.now().toISO(),
        },
      ],
    },
  });

  const addToDoCard = (
    isAdd: boolean,
    type: TodoListType,
    newCard: CardType
  ) => {
    if (isAdd) {
      const newCards = [...lists[type].cards, newCard];
      setLists({
        ...lists,
        [type]: {
          ...lists[type],
          cards: newCards,
        },
      });
    } else {
      const newCards = lists[type].cards.map((card) =>
        card.id === newCard.id ? newCard : card
      );
      setLists({
        ...lists,
        [type]: {
          ...lists[type],
          cards: newCards,
        },
      });
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
    setLists({
      ...lists,
      [TodoListType.DONE]: {
        ...lists[TodoListType.DONE],
        cards: [],
      },
    });
  };

  const handleDeleteTodoCard = (todoId: string, type?: TodoListType) => {
    if (type) {
      const newCards = lists[type].cards.filter((card) => card.id !== todoId);
      setLists({
        ...lists,
        [type]: {
          ...lists[type],
          cards: newCards,
        },
      });
    }
  };

  let value = {
    lists,
    addToDoCard,
    handleOpenAddEditTodoModal,
    handleCloseAddEditTodoModal,
    handleClearDoneCards,
    addEditTodoModalProps,
    handleDeleteTodoCard,
    setLists,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};
