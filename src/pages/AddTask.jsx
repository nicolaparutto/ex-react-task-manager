import { useState, useRef, useEffect } from "react";
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
	//Error message validazione in tempo reale:
	const [errMessage, setErrMessage] = useState(null);

	function handleSubmit(e) {
		e.preventDefault();
		// Validazioni titolo:
		const symbolsInTitle = symbols.split("").some((symbol) => {
			return taskTitle.includes(symbol)
		})
		if (taskTitle.trim() == "" || symbolsInTitle) {
			setErrMessage(`Il titolo della task non è valido, è obbligatorio inserire un titolo, e non può contenere simboli speciali come: ${symbols}`);
			return;
		} else {
			// Costruzione dell'oggetto newTask
			const newTask = {
				title: taskTitle,
				description: descriptionRef.current.value,
				status: statusRef.current.value
			}
			// Richiamare la funzione per aggingere una task
			addTask(newTask);
		}
	}

	// Reset del form quando resultMessage.status è true
	useEffect(() => {
		if (resultMessage.status) {
			setTaskTitle("");
			descriptionRef.current.value = "";
			statusRef.current.value = "To do";
			setErrMessage("");
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
					<button type="submit" >Aggiungi Task</button>
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