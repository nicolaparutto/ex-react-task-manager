// React utility:
import { BrowserRouter, Routes, Route } from "react-router-dom";
// Context Provider:
import { TasksProvider } from "./context/GlobalContext";

// Pages/Components:
import DefaultLayout from "./layouts/DefaultLayout";
import TaskList from "./pages/TaskList";
import AddTask from "./pages/AddTask";
import TaskDetail from "./pages/TaskDetail";

function App() {
  return (
    <TasksProvider>
      <BrowserRouter>
        <Routes>
          <Route Component={DefaultLayout}>
            <Route path="/" Component={TaskList} />
            <Route path="/add-task" Component={AddTask} />
            <Route path="/task-detail/:id" Component={TaskDetail} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TasksProvider>
  )
}

export default App