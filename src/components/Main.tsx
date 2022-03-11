import { Grid } from "@mui/material";
import React from "react";
import { TodoListType } from "../types";
import { AddTodoDialog } from "./AddTodoDialog";
import { TodoList } from "./TodoList";

type Props = {};

export const Main = (props: Props) => {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Grid container height={"100%"} spacing={2}>
        <Grid item xs={12} md={4}>
          <TodoList type={TodoListType.TODO} />
        </Grid>
        <Grid item xs={12} md={4}>
          <TodoList type={TodoListType.IN_PROGRESS} />
        </Grid>
        <Grid item xs={12} md={4}>
          <TodoList type={TodoListType.DONE} />
        </Grid>
      </Grid>
      <AddTodoDialog isOpen={open} handleClose={handleClose} />
    </>
  );
};
