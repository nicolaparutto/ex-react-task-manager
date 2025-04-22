import { useState, useRef, useEffect, useMemo } from "react";
import { useTasksDataContext } from "../context/GlobalContext";
const symbols = "!@#$%^&*()-_=+[]{}|;:'\",.<>?/`~";

function AddTask() {
	// Custom Hook:
	const { useTasks } = useTasksDataContext();
	const { addTask, resultMessage } = useTasks();

	// Variabili dati del form:
	const [taskTitle, setTaskTitle] = useState("");
	const descriptionRef = useRef("");
	const statusRef = useRef("");
	const [errMessage, setErrMessage] = useState("");
	console.log(statusRef);

	// Validazioni titolo in tempo reale:
	const titleHandle = useMemo(() => {
		if (taskTitle.trim() == "") {
			setErrMessage("È obbligatorio inserire un titolo")
			return false;
		}
		if (symbols.split("").some(symbol => taskTitle.includes(symbol))) {
			setErrMessage("Il titlo non può contenere caratteri speciali")
			return false
		}
		setErrMessage("")
		return true
	}, [taskTitle])

	// Funzione al submit del form:
	function handleSubmit(e) {
		e.preventDefault();
		if (titleHandle) {
			// Costruzione dell'oggetto newTask:
			const newTask = {
				title: taskTitle,
				description: descriptionRef.current.value,
				status: statusRef.current.value
			}
			// Richiamare la funzione per aggingere una task:
			addTask(newTask);
		} else {
			return
		}
	}

	// Reset del form quando resultMessage.status è true:
	useEffect(() => {
		if (resultMessage.status) {
			setTaskTitle("");
			descriptionRef.current.value = "";
			statusRef.current.value = "To do";
		}
	}, [resultMessage]);

	return (
		<section className="container">
			<form action="#" onSubmit={handleSubmit}>
				<label>
					<span>Titolo della task</span>
					<input type="text" name="name" value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} />
				</label>
				{errMessage && (
					<p className="error-message">{errMessage}</p>
				)}
				<label>
					<span>Descrizione</span>
					<textarea ref={descriptionRef}></textarea>
				</label>
				<label>
					<span>Stato</span>
					<select ref={statusRef}>
						<option value="To do">To do</option>
						<option value="Doing">Doing</option>
						<option value="Done">Done</option>
					</select>
				</label>
				<div>
					<button type="submit">Aggiungi Task</button>
					{resultMessage && (
						<p style={resultMessage.status ? { color: "green", fontSize: "0.9rem" } : { color: "red", fontSize: "0.9rem" }}>
							{resultMessage.message}
						</p>
					)}
				</div>
			</form>
		</section>
	)
}

export default AddTask