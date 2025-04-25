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

	// Gestione dei colori dello status della task:
	let toDoColor;
	if (task?.status === "To do") {
		toDoColor = "#f74c46"
	} else if (task?.status === "Doing") {
		toDoColor = "#efef63"
	} else {
		toDoColor = "#4eb94e"
	}

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
		<section>
			<div className="taskdetail">
				{task && (
					<>
						<div className="task-info">
							<div className="task-intestation">
								<h2>Task: <span>{task.title}</span></h2>
								<div className="status" style={{ "backgroundColor": toDoColor }}>{task.status}</div>
							</div>
							<div className="task-description">
								<p><span>Data:</span> {`${date.ora} ${date.month}/${date.year}`}</p>
								<span>Descrizione:</span>
								<p>{task.description}</p>
							</div>
						</div>
						<div className="task-handle">
							<button onClick={() => {
								setShowEditTask(true)
								setTaskToModify(task)
							}} className="modify-btn">Modifica</button>
							<button onClick={() => setShow(true)} className="delete-btn">Ellimina</button>
						</div>
					</>
				)}
			</div>
			<Modal show={show} title="Eliminare la task definitivamente?" onConfirm={() => handleDelete(id)} onClose={() => setShow(false)} />
			<EditTaskModal show={showEditTask} task={taskToModify} onClose={() => setShowEditTask(false)} onSave={updateTask} />
		</section>
	)
}

export default TaskDetail