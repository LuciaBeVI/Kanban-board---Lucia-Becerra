import React, { useState, useMemo, useEffect } from "react";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { KanbanBoardPage } from "./dashboard/components/pages/KanbanBoardPage";


const App = () => {
  const [mode, setMode] = useState<"light" | "dark">(() => {
    return (localStorage.getItem("theme") as "light" | "dark") || "light";
  });

  useEffect(() => {
    localStorage.setItem("theme", mode);
  }, [mode]);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === "light"
            ? {
                background: { default: "#f4f3f7ff", paper: "#eeeef7ff" },
                text: { primary: "#172b4d" },
              }
            : {
                background: { default: "#1d2125", paper: "#282836ff" },
                text: { primary: "#b6c2cf" },
              }),
        },
      }),
    [mode]
  );

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <KanbanBoardPage isDarkMode={mode === "dark"} toggleTheme={toggleColorMode} />
    </ThemeProvider>
  );
};

export default App;