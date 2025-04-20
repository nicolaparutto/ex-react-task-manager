import { useState, useRef } from "react"
const symbols = "!@#$%^&*()-_=+[]{}|;:'\",.<>?/`~";

function AddTask() {

	const [taskTitle, setTaskTitle] = useState("");
	const descriptionRef = useRef();
	const statusRef = useRef();
	const [errMessage, setErrMessage] = useState(null);
	const [confirmMessage, setConfirmMessage] = useState(null);

	function handleSubmit(e) {
		e.preventDefault();
		// Validazioni titolo:
		const symbolsInTitle = symbols.split("").some((symbol) => {
			return taskTitle.includes(symbol)
		})
		if (taskTitle.trim() === "" || symbolsInTitle) {
			setErrMessage(`Il titolo della task non è valido, è obbligatorio inserire un titolo, e non può contenere simboli speciali come: ${symbols}`);
			console.log(errMessage)
			return;
		} else {
			// Costruzione dell'oggetto newTask
			const newTask = {
				title: taskTitle,
				description: descriptionRef.current.value,
				status: statusRef.current.value
			}
			console.log(newTask)
			setConfirmMessage("Task aggiunta!")
		}
	}

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
					{confirmMessage && (
						<p className="confirm-message">{confirmMessage}</p>
					)}
				</div>
			</form>
		</section>
	)
}

export default AddTask