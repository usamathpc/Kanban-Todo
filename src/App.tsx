import React from "react";
import { Layout } from "./components/Layout";
import { Main } from "./components/Main";
import { TodoProvider } from "./TodoContext";
function App() {
  return (
    <TodoProvider>
      <Layout>
        <Main />
      </Layout>
    </TodoProvider>
  );
}

export default App;
