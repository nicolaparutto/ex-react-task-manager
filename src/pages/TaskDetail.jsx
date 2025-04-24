import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useTasksDataContext } from "../context/GlobalContext";
import formatDateTimeLocale from "../assets/functions/dateFormatter";
import Modal from "../components/Modal";
import EditTaskModal from "../components/EditTaskModal";

function TaskDetail() {
	const { id } = useParams();
	const [show, setShow] = useState(false);
	const [showEditTask, setShowEditTask] = useState(false);


	const [taskToModify, setTaskToModify] = useState({});

	//Custom Hook:
	const { useTasks } = useTasksDataContext();
	const { tasks, removeTask, updateTask } = useTasks();

	// Trovo la task selezionata:
	const task = tasks.find(task => task.id === parseInt(id));

	// Richiamo funzione di formattazione data:
	const date = task ? formatDateTimeLocale(task?.createdAt) : null;

	const navigate = useNavigate();
	// Funzione al click del bottone "Ellimina":
	async function handleDelete(taskId) {
		try {
			await removeTask(taskId);
			alert("Task eliminata con successo");
			navigate("/");
		} catch (error) {
			alert(error.message);
		}
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
						<button onClick={() => setShow(true)} className="delete-btn">Ellimina</button>
						<button onClick={() => {
							setShowEditTask(true)
							setTaskToModify(task)
						}} className="modify-btn">Modifica</button>
					</>
				)}
			</div>
			<Modal show={show} title="Eliminare la task definitivamente?" onConfirm={() => handleDelete(id)} onClose={() => setShow(false)} />
			<EditTaskModal show={showEditTask} task={taskToModify} onClose={() => setShowEditTask(false)} onSave={updateTask} />
		</section>
	)
}

export default TaskDetail