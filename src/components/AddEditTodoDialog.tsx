import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { DateTime } from "luxon";
import * as React from "react";
import { v4 as uuidv4 } from "uuid";
import { TodoContext } from "../TodoContext";
import { TodoListType } from "../types";

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

  React.useEffect(() => {
    setTodoId(props.todoId);
    setTitle(props.title);
    setDescription(props.description);
    setType(props.type);
  }, [props]);

  return (
    <Dialog
      maxWidth="sm"
      fullWidth
      open={props.isOpen}
      onClose={handleCloseAddEditTodoModal}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
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
        <DialogTitle>{props.isAdd ? "Add" : "Edit"} Todo</DialogTitle>
        <DialogContent>
          <TextField
            sx={{
              mt: "0.5rem",
              mb: "1rem",
            }}
            placeholder="My todo.."
            autoFocus
            fullWidth
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            label="Title"
            variant="outlined"
          />
          <TextField
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            placeholder="My description.."
            variant="outlined"
            label="Description"
          />
        </DialogContent>

        <DialogActions>
          <Button variant="outlined" onClick={handleCloseAddEditTodoModal}>
            Cancel
          </Button>
          <Button variant="contained" type="submit">
            {props.isAdd ? "Add" : "Edit"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
