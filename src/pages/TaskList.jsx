import { useEffect } from "react";
import { useTasksDataContext } from "../context/GlobalContext"

function TaskList() {

	const { tasksList, fetchTasks } = useTasksDataContext();

	console.log(tasksList);

	// fetchTasks al caricamento del componente:
	useEffect(() => {
		fetchTasks()
	}, [])

	return (
		<div>TaskList</div>
	)
}

export default TaskList