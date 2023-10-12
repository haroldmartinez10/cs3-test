import { createTheme } from "@mui/material/styles";

import { useState } from "react";

const useTheme = () => {
  const [darkMode, setDarkMode] = useState(true);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  return { theme, darkMode, setDarkMode };
};

export default useTheme;
