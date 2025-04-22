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
		toDoColor = "red"
	} else if (status === "Doing") {
		toDoColor = "yellow"
	} else {
		toDoColor = "green"
	}

	return (
		<Link to={`/task-detail/${id}`}>
			<div className="task-row">
				<div className="task-status" style={{ "backgroundColor": toDoColor }}>
					<p>{status}</p>
				</div>
				<div className="task-title">
					<p>{title}</p>
				</div>
				<div className="task-date">
					<p>{date.ora} || {date.data}</p>
				</div>
			</div>
		</Link >
	)
}

export default memo(Task)