import { useParams, useNavigate } from "react-router-dom";
import { useTasksDataContext } from "../context/GlobalContext";
import formatDateTimeLocale from "../assets/functions/dateFormatter";

function TaskDetail() {
	const { id } = useParams();

	//Custom Hook:
	const { useTasks } = useTasksDataContext();
	const { tasks, removeTask } = useTasks();

	// Trovo la task selezionata:
	const task = tasks.find(task => task.id === parseInt(id));

	// Richiamo funzione di formattazione data:
	const date = task ? formatDateTimeLocale(task?.createdAt) : null;

	const navigate = useNavigate();
	// Funzione al click del bottone "Ellimina Task":
	function handleDelete(taskId) {
		removeTask(taskId);
		alert("Taks eliminata con successo");
		navigate("/");
	}
	return (
		<section className="container">
			<div className="taskdetail">
				{task && (
					<>
						<h1>{task.title}</h1>
						<p>Descrizione: {task.description}</p>
						<p>Status: {task.status}</p>
						<p>Data: {date ? `${date.data} || ${date.ora}` : "Data non disponibile"}</p>
						<button onClick={() => handleDelete(task.id)}>Ellimina Task</button>
					</>
				)}
			</div>
		</section>
	)
}

export default TaskDetail