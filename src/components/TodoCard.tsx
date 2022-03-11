import { Delete, Edit } from "@mui/icons-material";
import { IconButton, Paper, Typography } from "@mui/material";
import React from "react";
import { TodoContext } from "../TodoContext";
import { TodoCardType, TodoListType } from "../types";

type Props = {
  type?: TodoListType;
  cardDetails: TodoCardType;
};

export const TodoCard = (props: Props) => {
  const { handleOpenAddEditTodoModal, handleDeleteTodoCard } =
    React.useContext(TodoContext);
  return (
    <Paper
      sx={{
        borderRadius: 0,
        minHeight: "60px",
        borderLeft: `5px solid ${
          props.type === TodoListType.TODO
            ? "#e5deca"
            : props.type === TodoListType.IN_PROGRESS
            ? "#d5d8e5"
            : "#cfdcd3"
        }`,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        m: 1,
      }}
    >
      <Typography>{props.cardDetails.title}</Typography>
      <Typography>{props.cardDetails.description}</Typography>
      <Typography>{props.cardDetails.createdAt}</Typography>
      <IconButton
        onClick={() =>
          handleOpenAddEditTodoModal(
            false,
            props.cardDetails.id,
            props.cardDetails.title,
            props.cardDetails.description,
            props.cardDetails.type,
            props.cardDetails.createdAt
          )
        }
      >
        <Edit />
      </IconButton>
      <IconButton
        onClick={() =>
          handleDeleteTodoCard(props.cardDetails.id, props.cardDetails.type)
        }
      >
        <Delete />
      </IconButton>
    </Paper>
  );
};
