import { useEffect, useState } from "react";
import { useTasksDataContext } from "../context/GlobalContext";

import Task from "../components/Task";

function TaskList() {
	// Importazione dell'hook personalizzato
	const { useTasks } = useTasksDataContext()

	// Uso e destrutturazione dell'hook per estrarre le tasks e la funzione che le richiama:
	const [tasks, fetchTasks] = useTasks()

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
				{tasks.map(task => (
					<Task key={task.id} taskData={task} />
				))}
			</div>
		</section>
	)
}

export default TaskList