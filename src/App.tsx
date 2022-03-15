import { createTheme, ThemeProvider } from "@mui/material";
import React from "react";
import { Layout } from "./components/Layout";
import { Main } from "./components/Main";
import { TodoProvider } from "./TodoContext";
function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#F9D8D6",
      },
      secondary: {
        main: "#EFF9DA",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <TodoProvider>
        <Layout>
          <Main />
        </Layout>
      </TodoProvider>
    </ThemeProvider>
  );
}

export default App;
