// React utility: 
import { useMemo, useState, useCallback } from "react";
// GlobalContext:
import { useTasksDataContext } from "../context/GlobalContext";
// Function utility:
import debounce from "../assets/functions/debounceFuction";
// Components:
import Task from "../components/Task";

function TaskList() {
	// Custom Hook:
	const { useTasks } = useTasksDataContext();
	const { tasks } = useTasks();

	// Ricerca nella searchbar:
	const [searchQuery, setSearchedQuery] = useState("");
	// Ordinamento tasks:
	const [sortBy, setSortBy] = useState("default"); //criterio di ordinamento (title, status, createdAt)
	const [sortOrder, setSortOrder] = useState(1); //direzione (1 per crescente, -1 per decrescente)

	// Gestione debounce risultati di ricerca:
	const debounceFindSearched = useCallback(
		debounce(setSearchedQuery, 500)
		, [])

	// Funzione di gestione ordinamenti tasks:
	function handleSort(selected) {
		if (sortBy === selected) {
			setSortOrder(prev => prev * -1)
		} else {
			setSortBy(selected)
			setSortOrder(1)
		}
	}

	// Icona da visualizzare in caso di selezione ordinamenti tasks:
	const sortIcon = sortOrder === 1 ? <i class="fa-solid fa-caret-down"></i> : <i class="fa-solid fa-caret-up"></i>;

	// Funzione di ordinamento task in base a ricerca/selezione ordinamento:
	const searchedAndSortedTasks = useMemo(() => {
		let comparison;
		return [...tasks]
			.filter(task => {
				return task.title.toLowerCase().includes(searchQuery.toLowerCase())
			})
			.sort((taskA, taskB) => {
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
	}, [tasks, sortBy, sortOrder, searchQuery]);

	//======================================================================
	return (
		<section>
			<div className="tasks-search-bar">
				<input type="text" placeholder="Cerca una task..." onChange={(e) => debounceFindSearched(e.target.value)} />
			</div>
			<div className="tasks-list">
				{tasks.length > 0 ? <>
					<div className="list-intestation">
						<span onClick={() => handleSort("status")}>
							Stato {sortBy === "status" ? sortIcon : <i className="fa-solid fa-sort"></i>}
						</span>
						<span onClick={() => handleSort("title")}>
							Titolo {sortBy === "title" ? sortIcon : <i className="fa-solid fa-sort"></i>}
						</span>
						<span onClick={() => handleSort("createdAt")}>
							Creata il {sortBy === "createdAt" ? sortIcon : <i className="fa-solid fa-sort"></i>}
						</span>
					</div>
					<div className="list">
						{searchedAndSortedTasks?.map(task => (
							<Task key={task.id} taskData={task} />
						))}
					</div>
				</> :
					<>
						<div className="no-task-finded">
							<p>Non hai ancora nessuna task</p>
						</div>
					</>
				}
			</div>
		</section >
	)
}

export default TaskList