import axios from "axios";
import { useState, useContext, createContext } from "react";

// Definizione di un nuovo context
const TasksDataContext = createContext();

const TasksProvider = ({ children }) => {
	const apiUrl = import.meta.env.VITE_API_URL;

	// HOOK personalizzato per gestire le tasks:
	const useTasks = () => {
		const [tasks, setTasks] = useState([])
		// [GET] Chiamata per ricevere la lista delle task
		const fetchTasks = async () => {
			try {
				const fetchResponse = await axios.get(`${apiUrl}/tasks`);
				setTasks(fetchResponse.data)
			} catch (error) {
				console.error(error)
			}
		}
		// [POST] Chiamata per aggiungere una task
		const addTask = async () => {
			try {

			} catch (error) {

			}
		}
		// [DELETE] Chiamata per rimuovere una task
		const removeTask = async (id) => {
			try {

			} catch (error) {

			}
		}
		// [PUT] Chiamata per modificare una task
		const updateTask = async (id) => {
			try {

			} catch (error) {

			}
		}

		return [tasks, fetchTasks, addTask, removeTask, updateTask]
	}

	return (
		<TasksDataContext.Provider value={{ useTasks }}>
			{children}
		</TasksDataContext.Provider>
	)
}

const useTasksDataContext = () => {
	return useContext(TasksDataContext)
}

export { useTasksDataContext, TasksProvider }