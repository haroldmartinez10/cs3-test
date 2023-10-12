import { SetStateAction, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos } from "../features/todo/todoSlice";
import { AppDispatch } from "../app/store";
import { ArrayTodo, TodoType } from "../types/todoType";
import CardTask from "./CardTask";
import EditModal from "./EditModal";
import { Grid, Container, TextField } from "@mui/material";

interface iProps {
  selectedValue: string;
}

const ListOfTasks = ({ selectedValue }: iProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const [searchTerm, setSearchTerm] = useState("");
  const handleSearchChange = (event: {
    target: { value: SetStateAction<string> };
  }) => setSearchTerm(event.target.value);

  interface RootState {
    todo: ArrayTodo;
  }

  const todo = useSelector((state: RootState) => state.todo);

  const [currentTask, setCurrentTask] = useState({
    name: "",
    description: "",
    _id: "",
  });

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const loadEdit = (task: TodoType) => {
    setCurrentTask(task);
    handleOpen();
  };

  const filteredTasks = todo.filter((task) =>
    task.description.includes(searchTerm)
  );

  return (
    <Container style={{ marginTop: 20 }}>
      <EditModal
        currentTask={currentTask}
        open={open}
        handleClose={handleClose}
      />
      <TextField
        label="Search Task By Description"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={handleSearchChange}
        style={{ marginBottom: 20 }}
      />
      <Grid container spacing={2}>
        {filteredTasks.map((task) => {
          if (
            (selectedValue === "a" && task.completed) ||
            (selectedValue !== "a" && !task.completed) ||
            (selectedValue === "c" && task)
          ) {
            return (
              <Grid item xs={6} sm={4} md={3} key={task._id}>
                <CardTask loadEdit={loadEdit} task={task} />
              </Grid>
            );
          }
          return null;
        })}
      </Grid>
    </Container>
  );
};

export default ListOfTasks;
