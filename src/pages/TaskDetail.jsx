import { useParams } from "react-router-dom";
import { useTasksDataContext } from "../context/GlobalContext";

function TaskDetail() {
	const { id } = useParams();

	return (
		<div>{`Dettaglio della task con id: ${id}`}</div>
	)
}

export default TaskDetail