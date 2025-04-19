import axios from "axios";
import { useState, useContext, createContext } from "react";

// Definizione di un nuovo context
const TasksDataContext = createContext();

const TasksProvider = ({ children }) => {
	const apiUrl = import.meta.env.VITE_API_URL;

	const [tasksList, setTasksLists] = useState([]);

	// [GET] Chiamata per ricevere la lista delle task
	const fetchTasks = async () => {
		try {
			const fetchResponse = await axios.get(`${apiUrl}/tasks`);
			setTasksLists(fetchResponse.data)
		} catch (error) {
			console.error(error)
		}
	}

	return (
		<TasksDataContext.Provider value={{ tasksList, fetchTasks }}>
			{children}
		</TasksDataContext.Provider>
	)
}

const useTasksDataContext = () => {
	return useContext(TasksDataContext)
}

export { useTasksDataContext, TasksProvider }