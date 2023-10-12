import Modal from "@mui/material/Modal";
import AddBoxIcon from "@mui/icons-material/AddBox";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { Dispatch, SetStateAction } from "react";

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

interface iProps {
  setTitleInput: Dispatch<SetStateAction<string>>;
  descriptionInput: string;
  titleInput: string;
  open: boolean;
  handleClose: () => void;
  handleOpen: () => void;
  setDescriptionInput: Dispatch<SetStateAction<string>>;
  handleCreateNewTask: () => void;
}

export function NewTaskModal({
  handleOpen,
  open,
  handleClose,
  titleInput,
  setTitleInput,
  descriptionInput,
  setDescriptionInput,
  handleCreateNewTask,
}: iProps) {
  return (
    <div>
      <Button color="inherit" onClick={handleOpen}>
        {" "}
        <AddBoxIcon style={{ marginRight: 5 }} />
        Create New Task
      </Button>
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
            Create Task
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
              value={titleInput}
              onChange={(e) => setTitleInput(e.target.value)}
            />
            <TextField
              hiddenLabel
              id="filled-hidden-label-normal"
              variant="filled"
              placeholder="Description Task"
              value={descriptionInput}
              onChange={(e) => setDescriptionInput(e.target.value)}
            />

            <Button onClick={handleCreateNewTask}>Add new Task</Button>
            <Button onClick={handleClose}>Cancel</Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}
