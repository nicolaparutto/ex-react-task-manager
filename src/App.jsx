import { BrowserRouter, Routes, Route } from "react-router-dom";

import DefaultLayout from "./layouts/DefaultLayout";
import TaskList from "./pages/TaskList";
import AddTask from "./pages/AddTask";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route Component={DefaultLayout}>
          <Route path="/" Component={TaskList} />
          <Route path="/add-task" Component={AddTask} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App