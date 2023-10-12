import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import { Button, Tooltip } from "@mui/material";
import { useDispatch } from "react-redux";
import { fetchTodos } from "../features/todo/todoSlice";
import axios from "axios";
import { AppDispatch } from "../app/store";
import Swal from "sweetalert2";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import StatusButton from "./StatusButton";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { TodoType } from "../types/todoType";

interface iProps {
  task: { _id: string; name: string; description: string; completed: boolean };
  loadEdit: (task: TodoType) => void;
}

export default function CardTask({ task, loadEdit }: iProps) {
  const dispatch = useDispatch<AppDispatch>();

  const handleDelete = async (id: string) => {
    try {
      const result = await Swal.fire({
        title: "¿Are you sure?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "Cancel",
        confirmButtonColor: "#d33",
      });

      if (result.isConfirmed) {
        await axios.delete(`${import.meta.env.VITE_API_KEY}api/todo/${id}`);
        dispatch(fetchTodos());

        Swal.fire(
          "Successfully deleted",
          "The task has been deleted.",
          "success"
        );
      }
    } catch (error) {
      console.error(error);

      Swal.fire(
        "Error",
        "There was an error while trying to delete the task.",
        "error"
      );
    }
  };

  return (
    <Card
      sx={{
        maxWidth: 345,
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.9)",
        },
      }}
    >
      <CardMedia
        component="i"
        sx={{
          height: 20,
          backgroundColor: task.completed === true ? "#4CAF50" : "#dc3545",
        }}
      />
      <div style={{ textAlign: "center", marginTop: 20 }}>
        {task.completed === true ? (
          <span style={{ color: "#4CAF50", fontWeight: "bold" }}>
            COMPLETED
          </span>
        ) : (
          <span style={{ color: "#FF5252", fontWeight: "bold" }}>PENDING</span>
        )}
      </div>
      <CardContent sx={{ height: 200 }}>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ fontSize: 20 }}
        >
          {task.name}
        </Typography>
        <Typography
          variant="body2"
          sx={{ fontSize: 11 }}
          color="text.secondary"
        >
          {task.description}
        </Typography>
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
        <StatusButton task={task} />
        <Tooltip title="Edit">
          <Button onClick={() => loadEdit(task)} sx={{ color: "#2196F3" }}>
            <ModeEditIcon />
          </Button>
        </Tooltip>
        <Tooltip title="Delete">
          <Button
            onClick={() => handleDelete(task._id)}
            sx={{ color: "#FF5252" }}
          >
            <DeleteForeverIcon />
          </Button>
        </Tooltip>
      </CardActions>
    </Card>
  );
}
