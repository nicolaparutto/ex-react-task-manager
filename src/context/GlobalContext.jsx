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
				console.error(error)
			}
		}
		// La funzione fetchTask viene immediatamente invocata al caricamento dell'app
		useEffect(() => {
			fetchTasks()
		}, [])
		// [POST] Chiamata per aggiungere una task
		const addTask = async (newTask) => {
			try {
				const response = await axios.post(`${apiUrl}/tasks`, newTask, { headers: { 'content-Type': 'application/json' } })
				if (response.data.success) {
					setTasks(prev => [...prev, response.data.task])
					setResultMessage({
						message: "Task aggiunta",
						status: true
					});
				} else {
					setResultMessage({
						message: "Errore durante l'aggiunta della task",
						status: false
					});
					throw new Error(response.data.message);
				}
			} catch (error) {
				console.error("Errore durante l'aggiunta della task:", error.message);
			}
		}
		// [DELETE] Chiamata per rimuovere una task
		const removeTask = async (taskId) => {
			try {
				const response = await axios.delete(`${apiUrl}/tasks/${taskId}`);
				if (response.data.success) {
					setTasks(prev => prev.filter(task => task.id !== taskId))
					setResultMessage({
						message: "Task eliminata con successo",
						status: true,
					});
				} else {
					setResultMessage({
						message: "Errore durante l'eliminazione della task",
						status: false
					});
					throw new Error(response.data.message);
				}
			} catch (error) {
				console.error("Errore durante l'eliminazione della task:", error.message);
				setResultMessage({
					message: "Errore durante l'eliminazione della task",
					status: false
				});
			}
		}
		// [PUT] Chiamata per modificare una task
		const updateTask = async (taskId) => {
			try {

			} catch (error) {

			}
		}

		return { tasks, resultMessage, addTask, removeTask, updateTask };
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