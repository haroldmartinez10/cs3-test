import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { Typography } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../app/store";
import { fetchTodos } from "../features/todo/todoSlice";
import Swal from "sweetalert2";

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

type CurrentTask = {
  name: string;
  description: string;
  _id: string;
};

interface iProps {
  open: boolean;
  handleClose: () => void;
  currentTask: CurrentTask;
}

export default function EditModal({ currentTask, open, handleClose }: iProps) {
  const [currentNameInput, setCurrentNameInput] = useState("");
  const [currentDescriptionInput, setCurrentDescriptionInput] = useState("");

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    setCurrentNameInput(currentTask.name);
    setCurrentDescriptionInput(currentTask.description);
  }, [currentTask]);

  const handleEdit = async () => {
    handleClose();
    const confirmResult = await Swal.fire({
      title: "Confirmation",
      text: "Are you sure you want to edit this task?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, edit it",
      cancelButtonText: "No, cancel",
    });

    if (confirmResult.isConfirmed) {
      handleClose();

      const editUser = {
        name: currentNameInput,
        description: currentDescriptionInput,
      };

      try {
        await axios.patch(
          `${import.meta.env.VITE_API_KEY}api/todo/${currentTask._id}`,
          editUser
        );

        dispatch(fetchTodos());
      } catch (error) {
        error;
      }
    }
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            sx={{ marginBottom: 2 }}
            id="modal-modal-title"
            variant="h6"
            component="h2"
          >
            Edit Task
          </Typography>
          <Stack
            component="form"
            sx={{
              width: "100%",
            }}
            spacing={2}
            noValidate
            autoComplete="off"
          >
            <TextField
              hiddenLabel
              id="filled-hidden-label-normal"
              variant="filled"
              placeholder="Title Task"
              value={currentNameInput}
              onChange={(e) => setCurrentNameInput(e.target.value)}
            />
            <TextField
              hiddenLabel
              id="filled-hidden-label-normal"
              variant="filled"
              value={currentDescriptionInput}
              placeholder="Description Task"
              onChange={(e) => setCurrentDescriptionInput(e.target.value)}
            />

            <Button onClick={() => handleEdit()}>EDIT TASK</Button>
            <Button onClick={handleClose}>CANCEL</Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}
