import { useTasksDataContext } from "../context/GlobalContext";
import { useMemo, useState } from "react";
import Task from "../components/Task";

function TaskList() {
	// Custom Hook:
	const { useTasks } = useTasksDataContext();
	const { tasks } = useTasks();

	const [sortBy, setSortBy] = useState("default"); //criterio di ordinamento (title, status, createdAt)
	const [sortOrder, setSortOrder] = useState(1); //direzione (1 per crescente, -1 per decrescente)

	function handleSort(selected) {
		if (sortBy === selected) {
			setSortOrder(prev => prev * -1)
		} else {
			setSortBy(selected)
			setSortOrder(1)
		}
	}
	const sortIcon = sortOrder === 1 ? "▽" : "△";

	const sortedTasks = useMemo(() => {
		if (sortBy === "default") {
			return [...tasks];
		} else {
			let comparison;
			return [...tasks].sort((taskA, taskB) => {
				if (sortBy === "title") {
					comparison = taskA.title.localeCompare(taskB.title)
				}
				if (sortBy === "status") {
					const statusOptions = ["To do", "Doing", "Done"]
					comparison = statusOptions.indexOf(taskA.status) - statusOptions.indexOf(taskB.status)
				}
				if (sortBy === "createdAt") {
					comparison = (new Date(taskA.createdAt) - new Date(taskB.createdAt));
				}
				return sortOrder * comparison
			})
		}
		return [...tasks];
	}, [tasks, sortBy, sortOrder]);



	return (
		<section className="container">
			<div className="tasks-list">
				<div className="list-intestation">
					<span onClick={() => handleSort("status")}>Stato {sortBy === "status" && sortIcon}</span>
					<span onClick={() => handleSort("title")}>Titolo {sortBy === "title" && sortIcon}</span>
					<span onClick={() => handleSort("createdAt")}>Creata il {sortBy === "createdAt" && sortIcon}</span>
				</div>
				{sortedTasks?.map(task => (
					<Task key={task.id} taskData={task} />
				))}
			</div>
		</section >
	)
}

export default TaskList