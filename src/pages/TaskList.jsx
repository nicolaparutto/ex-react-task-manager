import { useTasksDataContext } from "../context/GlobalContext";

import Task from "../components/Task";

function TaskList() {
	// Custom Hook:
	const { useTasks } = useTasksDataContext();
	const { tasks } = useTasks();

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