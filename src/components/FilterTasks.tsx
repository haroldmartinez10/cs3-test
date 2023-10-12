import * as React from "react";
import Radio from "@mui/material/Radio";
import Tooltip from "@mui/material/Tooltip";

interface iProps {
  selectedValue: string;
  setSelectedValue: (newValue: string) => void;
}

export default function FilterTasks({
  setSelectedValue,
  selectedValue,
}: iProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };

  const controlProps = (item: string, tooltipText: string) => ({
    checked: selectedValue === item,
    onChange: handleChange,
    value: item,
    name: "color-radio-button-demo",
    inputProps: { "aria-label": item },
    tooltipText: tooltipText,
  });

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Tooltip title="Filter by completed tasks" arrow>
        <Radio
          {...controlProps("a", "Filter by completed tasks")}
          sx={{
            color: "#4CAF50",
            "&.Mui-checked": {
              color: "#4CAF50",
            },
          }}
        />
      </Tooltip>
      <Tooltip title="Filter by uncompleted tasks" arrow>
        <Radio
          {...controlProps("b", "Filter by uncompleted tasks")}
          sx={{
            color: "#FF5252",
            "&.Mui-checked": {
              color: "#FF5252",
            },
          }}
        />
      </Tooltip>

      <Tooltip title="Show all tasks" arrow>
        <Radio
          {...controlProps("c", "Show all tasks")}
          sx={{
            color: "gray",
            "&.Mui-checked": {
              color: "gray",
            },
          }}
        />
      </Tooltip>
    </div>
  );
}
