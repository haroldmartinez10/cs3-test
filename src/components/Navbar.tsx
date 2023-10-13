import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos } from "../features/todo/todoSlice";
import { AppDispatch } from "../app/store";
import { TodoType } from "../types/todoType";
import Swal from "sweetalert2";

import axios from "axios";
import { NewTaskModal } from "./NewTaskModal";
import FilterTasks from "./FilterTasks";

interface iProps {
  setDarkMode: (darkMode: boolean) => void;
  darkMode: boolean;
  setSelectedValue: (value: string) => void;
  selectedValue: string;
}

const Navbar = ({
  setDarkMode,
  darkMode,
  setSelectedValue,
  selectedValue,
}: iProps) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [titleInput, setTitleInput] = useState("");
  const [descriptionInput, setDescriptionInput] = useState("");

  const dispatch = useDispatch<AppDispatch>();

  interface RootState {
    todo: TodoType;
  }

  useSelector((state: RootState) => state.todo);

  const handleCreateNewTask = async () => {
    handleClose();

    const newTask = {
      name: titleInput,
      description: descriptionInput,
    };

    const confirmResult = await Swal.fire({
      title: "¿Are you sure you want to create this task??",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, create task",
      cancelButtonText: "Cancel",
    });

    if (confirmResult.isConfirmed) {
      try {
        await axios.post(
          `${import.meta.env.VITE_API_KEY}api/todo/newTask`,
          newTask
        );

        Swal.fire({
          icon: "success",
          title: "Successful operation",
          text: "The task has been created successfully.",
        });

        dispatch(fetchTodos());

        setTitleInput("");
        setDescriptionInput("");
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "There was an error creating the task.",
        });
      }
    }
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Button onClick={() => setDarkMode(!darkMode)} color="inherit">
            <DarkModeIcon />
          </Button>

          <FilterTasks
            setSelectedValue={setSelectedValue}
            selectedValue={selectedValue}
          />

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <NewTaskModal
              descriptionInput={descriptionInput}
              handleCreateNewTask={handleCreateNewTask}
              open={open}
              titleInput={titleInput}
              handleOpen={handleOpen}
              handleClose={handleClose}
              setTitleInput={setTitleInput}
              setDescriptionInput={setDescriptionInput}
            />
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
