import { memo } from "react";
import { Link } from "react-router-dom";
import formatDateTimeLocale from "../assets/functions/dateFormatter";

function Task({ taskData }) {
	const { id, title, status, createdAt } = taskData;
	// Richiamo funzione di formattazione data:
	const date = formatDateTimeLocale(createdAt);

	// Gestione dei colori dello status della task:
	let toDoColor;
	if (status === "To do") {
		toDoColor = "#f74c46"
	} else if (status === "Doing") {
		toDoColor = "#efef63"
	} else {
		toDoColor = "#4eb94e"
	}

	return (
		<>
			<Link to={`/task-detail/${id}`}>
				<div className="task-row">
					<div className="task-status" style={{ "backgroundColor": toDoColor }}>
						<p>{status}</p>
					</div>
					<div className="task-title">
						<p>{title}</p>
					</div>
					<div className="task-date">
						<p><span>{date.ora}</span>{date.month}</p>
					</div>
				</div>
			</Link>
		</>
	)
}

export default memo(Task)