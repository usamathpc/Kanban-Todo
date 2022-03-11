import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { TodoCardType, TodoListType } from "../types";
import { v4 as uuidv4 } from "uuid";
import { DateTime } from "luxon";
import { TodoContext } from "../TodoContext";

type Props = {
  isOpen: boolean;
  isAdd: boolean;
  todoId: string;
  title: string;
  description: string;
  type: TodoListType;
  createdAt: string;
};

export const AddEditTodoDialog = (props: Props) => {
  const { handleCloseAddEditTodoModal, addToDoCard } =
    React.useContext(TodoContext);
  const [todoId, setTodoId] = React.useState(props.todoId);
  const [title, setTitle] = React.useState(props.title);
  const [description, setDescription] = React.useState(props.description);
  const [type, setType] = React.useState(props.type);
  const [createdAt, setCreatedAt] = React.useState(props.createdAt);

  React.useEffect(() => {
    setTodoId(props.todoId);
    setTitle(props.title);
    setDescription(props.description);
    setType(props.type);
    setCreatedAt(props.createdAt);
  }, [props]);

  return (
    <div>
      <Dialog
        maxWidth="sm"
        fullWidth
        open={props.isOpen}
        onClose={handleCloseAddEditTodoModal}
      >
        <DialogTitle>
          <TextField
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            label="title"
            variant="standard"
          />
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <TextField
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              fullWidth
              variant="standard"
              label="description"
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddEditTodoModal}>Cancel</Button>
          <Button
            onClick={() => {
              addToDoCard(props.isAdd, props.type, {
                id: props.isAdd ? uuidv4() : todoId,
                title: title,
                description: description,
                type: type,
                createdAt: DateTime.now().toISO(),
              });
              handleCloseAddEditTodoModal();
            }}
          >
            {props.isAdd ? "Add" : "Edit"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
