import { useParams } from "react-router-dom";
import { useTasksDataContext } from "../context/GlobalContext";
import formatDateTimeLocale from "../assets/functions/dateFormatter";

function TaskDetail() {
	const { id } = useParams();

	//Custom Hook:
	const { useTasks } = useTasksDataContext();
	const { tasks } = useTasks();

	// Trovo la task selezionata:
	const task = tasks.find(task => task.id === parseInt(id));

	// Richiamo funzione di formattazione data:
	const date = task ? formatDateTimeLocale(task?.createdAt) : null;

	// Funzione al click del bottone "Ellimina Task":
	function handleDelete(taskId) {
		console.log(`Ellimino Task con id: ${taskId}`)
	}
	return (
		<section>
			{task ? (
				<>
					<h1>Titolo: {task.title}</h1>
					<p>Descrizione: {task.description}</p>
					<p>Status: {task.status}</p>
					<p>Data: {date ? `${date.data} || ${date.ora}` : "Data non disponibile"}</p>
					<button onClick={() => handleDelete(task.id)}>Ellimina Task</button>
				</>
			) : (
				<p>Task non trovata</p>
			)}
		</section>
	)
}

export default TaskDetail