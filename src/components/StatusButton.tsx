import * as React from "react";
import Radio from "@mui/material/Radio";
import Tooltip from "@mui/material/Tooltip";
import axios from "axios";
import { fetchTodos } from "../features/todo/todoSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../app/store";

interface iProps {
  task: { _id: string; name: string; description: string; completed: boolean };
}

export default function StatusButton({ task }: iProps) {
  const [selectedValue, setSelectedValue] = React.useState(
    task.completed ? "a" : "b"
  );

  const dispatch = useDispatch<AppDispatch>();

  const handleSwitchStatus = async (id: string) => {
    const putTask = {
      completed: selectedValue === "a" ? false : true,
    };

    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_KEY}api/todo/${id}`,
        putTask
      );

      response;

      dispatch(fetchTodos());
    } catch (error) {
      error;
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
    handleSwitchStatus(task._id);
  };

  const controlProps = (item: string) => ({
    checked: selectedValue === item,
    onChange: handleChange,
    value: item,
    name: "color-radio-button-demo",
    inputProps: { "aria-label": item },
  });

  return (
    <div>
      <Tooltip title="Complete task" placement="top" arrow>
        <Radio
          {...controlProps("a")}
          sx={{
            color: "#4CAF50",
            "&.Mui-checked": {
              color: "#4CAF50",
            },
          }}
        />
      </Tooltip>

      <Tooltip title="Pending task" placement="top" arrow>
        <Radio
          {...controlProps("b")}
          sx={{
            color: "#FF5252",
            "&.Mui-checked": {
              color: "#FF5252",
            },
          }}
        />
      </Tooltip>
    </div>
  );
}
