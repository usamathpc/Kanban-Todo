import { Box, Button } from "@mui/material";
import React, { useContext } from "react";
import { TodoCardType, TodoListType } from "../types";
import { TodoCard } from "./TodoCard";
import { TodoContext } from "../TodoContext";
import { DateTime } from "luxon";

type Props = {
  type: TodoListType;
  cards?: TodoCardType[];
};

export const TodoList = (props: Props) => {
  const { handleOpenAddEditTodoModal, handleClearDoneCards } =
    useContext(TodoContext);
  return (
    <Box
      sx={{
        bgcolor: "#f6f6f7",
        p: "5px",
        borderRadius: 2,
        height: "100%",
        maxHeight: "calc(100vh - 115px)",
        overflow: "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Box>
        {props.cards?.map((card) => (
          <TodoCard key={card.id} type={props.type} cardDetails={card} />
        ))}
      </Box>
      <Box display={"flex"} justifyContent="flex-end" alignItems={"center"}>
        {props.type === TodoListType.TODO ? (
          <Button
            onClick={() =>
              handleOpenAddEditTodoModal(
                true,
                "",
                "",
                "",
                TodoListType.TODO,
                DateTime.now().toISO()
              )
            }
          >
            Add Todo
          </Button>
        ) : props.type === TodoListType.DONE ? (
          <Button onClick={handleClearDoneCards}>Clear</Button>
        ) : null}
      </Box>
    </Box>
  );
};
