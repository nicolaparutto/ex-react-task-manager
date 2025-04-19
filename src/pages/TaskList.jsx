import { useEffect, useState } from "react";
import { useTasksDataContext } from "../context/GlobalContext";

import Task from "../components/Task";

function TaskList() {

	const { tasksList, fetchTasks } = useTasksDataContext();

	// fetchTasks al caricamento del componente:
	useEffect(() => {
		fetchTasks()
	}, [])
	return (
		<section className="container">
			<div className="tasks-list">
				<div className="list-intestation">
					<span>Stato</span>
					<span>Titolo</span>
					<span>Creata il:</span>
				</div>
				{tasksList.map(task => (
					<Task key={task.id} taskData={task} />
				))}
			</div>
		</section>
	)
}

export default TaskList