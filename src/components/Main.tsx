import { Divider, Grid, useMediaQuery, useTheme } from "@mui/material";
import React, { useCallback, useContext, useRef } from "react";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import ReactCanvasConfetti from "react-canvas-confetti";
import { TodoContext } from "../TodoContext";
import { ListData, ListType, TodoListType } from "../types";
import { AddEditTodoDialog } from "./AddEditTodoDialog";
import { TodoList } from "./TodoList";

type Props = {};
const canvasStyles: any = {
  position: "fixed",
  pointerEvents: "none",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0,
};

const onDragEnd = (
  result: DropResult,
  lists: ListType,
  setLists: React.Dispatch<React.SetStateAction<ListType>>,
  fireConfetti: any
) => {
  //if no destination list return!
  if (!result.destination) {
    return;
  }

  const { source, destination } = result;

  //if dropping in the same list reorder if needed
  if (source.droppableId === destination.droppableId) {
    const sourceList = lists[source.droppableId as keyof ListType];
    const sourceCardsCopy = [...sourceList.cards];
    const [removed] = sourceCardsCopy.splice(source.index, 1);
    sourceCardsCopy.splice(destination.index, 0, removed);
    setLists({
      ...lists,
      [source.droppableId]: {
        ...sourceList,
        cards: sourceCardsCopy,
      },
    });
  } else {
    //if dropping in different list
    const sourceList = lists[source.droppableId as keyof ListType];
    const destinationList = lists[destination.droppableId as keyof ListType];
    const sourceCardsCopy = [...sourceList.cards];
    const destinationCardsCopy = [...destinationList.cards];
    const [removed] = sourceCardsCopy.splice(source.index, 1);
    destinationCardsCopy.splice(destination.index, 0, removed);
    setLists({
      ...lists,
      [source.droppableId]: {
        ...sourceList,
        cards: sourceCardsCopy,
      },
      [destination.droppableId]: {
        ...destinationList,
        cards: destinationCardsCopy,
      },
    });

    //if destination list is DONE, fire confetti
    if (destination.droppableId === TodoListType.DONE) {
      fireConfetti();
    }
  }
};

export const Main = (props: Props) => {
  const { lists, setLists, addEditTodoModalProps } = useContext(TodoContext);
  const refAnimationInstance: any = useRef(null);

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("lg"));

  const getInstance = useCallback((instance) => {
    refAnimationInstance.current = instance;
  }, []);

  const makeShot = useCallback((particleRatio, opts) => {
    refAnimationInstance.current &&
      refAnimationInstance.current({
        ...opts,
        origin: { y: 0.7 },
        particleCount: Math.floor(200 * particleRatio),
      });
  }, []);

  const fire = useCallback(() => {
    makeShot(0.25, {
      spread: 26,
      startVelocity: 55,
    });

    makeShot(0.2, {
      spread: 60,
    });

    makeShot(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });

    makeShot(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });

    makeShot(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  }, [makeShot]);

  return (
    <>
      <DragDropContext
        onDragEnd={(result: DropResult) =>
          onDragEnd(result, lists, setLists, fire)
        }
      >
        <Grid container spacing={1}>
          {Object.entries(lists).map((list, index) => {
            const id: TodoListType = list[0] as TodoListType;
            const listData: ListData = list[1] as ListData;

            return (
              <Grid item key={id} xs={12} lg={4} style={{ paddingTop: 1 }}>
                <Droppable droppableId={id} key={id}>
                  {(provided, snapshot) => (
                    <>
                      {matches && index !== 0 && (
                        <Divider sx={{ mt: 2, mb: 2 }} />
                      )}
                      <TodoList
                        provided={provided}
                        snapshot={snapshot}
                        type={id}
                        cards={listData.cards}
                      />
                    </>
                  )}
                </Droppable>
              </Grid>
            );
          })}
        </Grid>
      </DragDropContext>
      <AddEditTodoDialog {...addEditTodoModalProps} />
      <ReactCanvasConfetti refConfetti={getInstance} style={canvasStyles} />
    </>
  );
};
