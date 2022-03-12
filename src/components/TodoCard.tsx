import { Delete, DoneAllOutlined, Edit } from "@mui/icons-material";
import {
  alpha,
  Divider,
  IconButton,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { DraggableProvided, DraggableStateSnapshot } from "react-beautiful-dnd";
import { TodoContext } from "../TodoContext";
import { CardType, TodoListType } from "../types";

type Props = {
  type?: TodoListType;
  cardDetails: CardType;
  provided: DraggableProvided;
  snapshot: DraggableStateSnapshot;
};

function getStyle(style: any, snapshot: any, targetColor: string) {
  if (!snapshot.isDropAnimating) {
    return style;
  }

  // patching the existing style
  return {
    ...style,
    transition: `all ease 0.3s`,
    backgroundColor: targetColor,
  };
}

const TODO_COLOR = "#F9D8D6";
const DONE_COLOR = "#EFF9DA";
const IN_PROGRESS_COLOR = "#CDF5F6";

export const TodoCard = (props: Props) => {
  const theme = useTheme();
  const { handleOpenAddEditTodoModal, handleDeleteTodoCard } =
    React.useContext(TodoContext);
  return (
    <Paper
      variant="elevation"
      elevation={0}
      ref={props.provided.innerRef}
      sx={{
        boxShadow: `rgba(149, 157, 165, 0.2) 0px 8px 24px`,
        bgcolor:
          props.type === TodoListType.TODO
            ? props.snapshot.isDragging
              ? TODO_COLOR
              : alpha(TODO_COLOR, 0.4)
            : props.type === TodoListType.IN_PROGRESS
            ? props.snapshot.isDragging
              ? IN_PROGRESS_COLOR
              : alpha(IN_PROGRESS_COLOR, 0.4)
            : props.snapshot.isDragging
            ? DONE_COLOR
            : alpha(DONE_COLOR, 0.4),
        borderRadius: "10px",
        p: 1,
        minHeight: "50px",

        m: 1,
      }}
      {...props.provided.draggableProps}
      {...props.provided.dragHandleProps}
      style={getStyle(
        props.provided.draggableProps.style,
        props.snapshot,
        props.snapshot.draggingOver === TodoListType.TODO
          ? alpha(TODO_COLOR, 0.4)
          : props.snapshot.draggingOver === TodoListType.IN_PROGRESS
          ? alpha(IN_PROGRESS_COLOR, 0.4)
          : alpha(DONE_COLOR, 0.4)
      )}
    >
      <Box
        display={"flex"}
        justifyContent="space-between"
        alignItems={"center"}
      >
        <Box>
          <Typography
            sx={{
              textDecoration:
                props.type === TodoListType.DONE ? "line-through" : "none",
            }}
            color="textSecondary"
            variant="body2"
          >
            Title
          </Typography>
          <Typography
            sx={{
              textDecoration:
                props.type === TodoListType.DONE ? "line-through" : "none",
            }}
            fontWeight={"600"}
          >
            {props.cardDetails.title}
          </Typography>
        </Box>
        {props.type === TodoListType.TODO ||
        props.type === TodoListType.IN_PROGRESS ? (
          <Box>
            <IconButton
              size="small"
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
              <Edit
                sx={
                  {
                    // color: ,
                  }
                }
              />
            </IconButton>
            <IconButton
              size="small"
              onClick={() =>
                handleDeleteTodoCard(
                  props.cardDetails.id,
                  props.cardDetails.type
                )
              }
            >
              <Delete
                sx={{
                  color: theme.palette.error.light,
                }}
              />
            </IconButton>
          </Box>
        ) : (
          <DoneAllOutlined
            sx={{
              color: theme.palette.success.light,
            }}
          />
        )}
      </Box>

      <Divider sx={{ mb: 1, mt: 1 }} />
      <Box
        sx={{
          textDecoration:
            props.type === TodoListType.DONE ? "line-through" : "none",
        }}
      >
        <Typography color="textSecondary" variant="body2">
          Description
        </Typography>
        <Typography>{props.cardDetails.description}</Typography>
      </Box>
    </Paper>
  );
};
