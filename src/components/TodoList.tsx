import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { DateTime } from "luxon";
import React, { useContext } from "react";
import {
  Draggable,
  DroppableProvided,
  DroppableStateSnapshot,
} from "react-beautiful-dnd";
import Scrollbars from "react-custom-scrollbars-2";
import { TodoContext } from "../TodoContext";
import { CardType, TodoListType } from "../types";
import { TodoCard } from "./TodoCard";

type Props = {
  type: TodoListType;
  cards?: CardType[];
  provided: DroppableProvided;
  snapshot: DroppableStateSnapshot;
};

const TODO_TITLE_COLOR = "#64130e";
const IN_PROGRESS_TITLE_COLOR = "#115d5f";
const DONE_TITLE_COLOR = "#486310";

export const TodoList = (props: Props) => {
  const { handleOpenAddEditTodoModal, handleClearDoneCards } =
    useContext(TodoContext);

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("lg"));

  return (
    <>
      <Box
        {...props.provided.droppableProps}
        ref={props.provided.innerRef}
        sx={{
          bgcolor: "#FCFCFC",
          p: "5px",
          borderRadius: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Box
          display={"flex"}
          justifyContent="space-between"
          alignItems={"center"}
          borderBottom={`5px solid ${
            props.type === TodoListType.TODO
              ? "#F9D8D6"
              : props.type === TodoListType.IN_PROGRESS
              ? "#CDF5F6"
              : "#EFF9DA"
          }
                        `}
          mb={1}
          pl={2}
          pr={2}
          height="50px"
        >
          <Typography
            color={
              props.type === TodoListType.TODO
                ? TODO_TITLE_COLOR
                : props.type === TodoListType.IN_PROGRESS
                ? IN_PROGRESS_TITLE_COLOR
                : DONE_TITLE_COLOR
            }
          >
            {props.type === TodoListType.TODO
              ? "✍️ Todo"
              : props.type === TodoListType.IN_PROGRESS
              ? "🎯 In Progress"
              : "✔️ Done"}
          </Typography>
          {props.type === TodoListType.TODO ? (
            <Button
              size="small"
              variant="contained"
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
              Add
            </Button>
          ) : props.type === TodoListType.DONE ? (
            <Button
              size="small"
              color="secondary"
              variant="contained"
              onClick={handleClearDoneCards}
            >
              Clear
            </Button>
          ) : null}
        </Box>
        <Scrollbars
          style={{
            height: matches ? "400px" : "calc(100vh - 181px)",
          }}
        >
          <Box pl={1} pr={1} pb={2}>
            {!!props.cards?.length ? (
              props.cards?.map((card, index) => (
                <Draggable key={card.id} draggableId={card.id} index={index}>
                  {(provided, snapshot) => (
                    <TodoCard
                      provided={provided}
                      snapshot={snapshot}
                      type={props.type}
                      cardDetails={card}
                    />
                  )}
                </Draggable>
              ))
            ) : (
              <Typography component="em" color="textSecondary">
                {props.type === TodoListType.TODO
                  ? "No todo cards yet!"
                  : props.type === TodoListType.IN_PROGRESS
                  ? "No in progress cards yet!"
                  : "No done cards yet!"}
              </Typography>
            )}
            {props.provided.placeholder}
          </Box>
        </Scrollbars>
      </Box>
    </>
  );
};
