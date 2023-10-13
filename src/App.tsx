import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Navbar from "./components/Navbar";
import useTheme from "./hooks/useTheme";
import ListOfTasks from "./components/ListOfTasks";
import { useState } from "react";

const App: React.FC = () => {
  const { setDarkMode, theme, darkMode } = useTheme();

  //Logica para renderizar si una tarea es a='completada' b='pendiente' c='mostrar todas las tareas'
  const [selectedValue, setSelectedValue] = useState("c");

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar
        setSelectedValue={setSelectedValue}
        selectedValue={selectedValue}
        setDarkMode={setDarkMode}
        darkMode={darkMode}
      />
      <ListOfTasks selectedValue={selectedValue} />
    </ThemeProvider>
  );
};

export default App;
