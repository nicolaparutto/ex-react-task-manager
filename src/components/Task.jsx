import { memo } from "react";
import { Link } from "react-router-dom";

function Task({ taskData }) {
	const { id, title, status, createdAt } = taskData;

	// Funzione per formattare la data:
	function formatDateTimeLocale(isoString) {
		const date = new Date(isoString);

		const day = String(date.getDate()).padStart(2, '0');
		const month = String(date.getMonth() + 1).padStart(2, '0');
		const year = date.getFullYear();

		const hours = String(date.getHours()).padStart(2, '0');
		const minutes = String(date.getMinutes()).padStart(2, '0');

		return {
			data: `${day}/${month}/${year}`,
			ora: `${hours}:${minutes}`
		};
	}
	const date = formatDateTimeLocale(createdAt)

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