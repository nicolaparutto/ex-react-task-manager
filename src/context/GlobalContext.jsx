import axios from "axios";
import { useState, useContext, createContext, useEffect } from "react";

// Definizione di un nuovo context
const TasksDataContext = createContext();

const TasksProvider = ({ children }) => {
	const apiUrl = import.meta.env.VITE_API_URL;

	// HOOK personalizzato per gestire le tasks:
	const useTasks = () => {
		// ==STATE== lista tasks:
		const [tasks, setTasks] = useState([]);
		// ==STATE== messaggio di riusltato all'agiunta di nuove task:
		const [resultMessage, setResultMessage] = useState({ message: "", status: null });
		// [GET] Chiamata per ricevere la lista delle task
		const fetchTasks = async () => {
			try {
				const fetchResponse = await axios.get(`${apiUrl}/tasks`);
				setTasks(fetchResponse.data)
			} catch (error) {
				console.error("Errore durante il caricamento delle task:", error)
			}
		}
		// La funzione fetchTask viene immediatamente invocata al caricamento dell'app
		useEffect(() => {
			fetchTasks()
		}, [])
		// [POST] Chiamata per aggiungere una task
		const addTask = async (newTask) => {
			const response = await axios.post(`${apiUrl}/tasks`, newTask, { headers: { 'content-Type': 'application/json' } })
			if (response.data.success) {
				setTasks(prev => [...prev, response.data.task])
				setResultMessage({
					message: "Task aggiunta",
					status: true
				});
			}
			if (!response.data.success) {
				throw new Error(response.data.message)
			}
		}
		// [DELETE] Chiamata per rimuovere una task
		const removeTask = async (taskId) => {
			const response = await axios.delete(`${apiUrl}/tasks/${taskId}`);
			if (response.data.success) {
				setTasks(prev => {
					return prev.filter(task => task.id !== taskId)
				})
			}
			if (!response.data.success) {
				throw new Error(response.data.message)
			}
		}
		// [PUT] Chiamata per modificare una task
		const updateTask = async (updatedTask, taskId) => {
			const response = await axios.put(`${apiUrl}/tasks/${taskId}`, updatedTask, { headers: { 'content-Type': 'application/json' } });
			if (response.data.success) {
				setTasks(prev => {
					return prev.map(task => {
						return task.id === taskId ? { ...task, ...response.data.task } : task
					})
				})
			}
			if (!response.data.success) {
				throw new Error(response.data.message)
			}
		}

		return { tasks, resultMessage, setResultMessage, addTask, removeTask, updateTask };
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