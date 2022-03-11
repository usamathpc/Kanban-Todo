import { Grid } from "@mui/material";
import React, { useContext } from "react";
import { TodoContext } from "../TodoContext";
import { TodoListType } from "../types";
import { AddEditTodoDialog } from "./AddEditTodoDialog";
import { TodoList } from "./TodoList";

type Props = {};

export const Main = (props: Props) => {
  const { todoCards, inProgressCards, doneCards, addEditTodoModalProps } =
    useContext(TodoContext);

  return (
    <>
      <Grid container maxHeight={"100%"} height={"100%"} spacing={2}>
        <Grid item xs={12} md={4}>
          <TodoList cards={todoCards} type={TodoListType.TODO} />
        </Grid>
        <Grid item xs={12} md={4}>
          <TodoList cards={inProgressCards} type={TodoListType.IN_PROGRESS} />
        </Grid>
        <Grid item xs={12} md={4}>
          <TodoList cards={doneCards} type={TodoListType.DONE} />
        </Grid>
      </Grid>
      <AddEditTodoDialog {...addEditTodoModalProps} />
    </>
  );
};
