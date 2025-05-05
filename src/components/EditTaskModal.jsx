// React utility:
import { useState, useRef, useEffect } from "react";
// Components:
import Modal from "./Modal";

function EditTaskModal({
	show = false, // Stato booleano per visualizzarla.
	onClose = () => { }, // Funzione per chiudere la modale.
	task, // Oggetto che rappresenta il task da modificare.
	onSave = () => { } //Funzione per salvare ed inviare la task modificata.
}) {

	// State della task da modificare:
	const [taskModified, setTaskModified] = useState(task);
	// Ref al form della modale:
	const formRef = useRef();

	// Funzione che aggiorna la taskModificata al change del form:
	function changeTaskData(key, value) {
		setTaskModified(prev => {
			return { ...prev, [key]: value }
		})
	}

	// Funzione al submit del form:
	async function handleSubmit(e) {
		e.preventDefault()
		try {
			onSave(taskModified, task.id)
			alert("Task modificata con successo")
			onClose(() => setShow(false))
		} catch (error) {
			alert(error.message)
		}
	}

	// useEffect al cambiamento della prop task, che valorizza taskModified:
	useEffect(() => {
		if (task) {
			setTaskModified(task);
		}
	}, [task]);
	
	//======================================================================
	return show && (
		<Modal
			show={show}
			title="Modifica la task:"
			content={
				<form ref={formRef} onSubmit={handleSubmit}>
					<label>
						<span>Titolo:</span>
						<input type="text" value={taskModified?.title || ""} onChange={e => { changeTaskData("title", e.target.value) }} />
					</label>
					<label>
						<span>Descrizione:</span>
						<textarea value={taskModified?.description || ""} onChange={e => { changeTaskData("description", e.target.value) }} />
					</label>
					<label>
						<span>Stato:</span>
						<select value={taskModified?.status} onChange={e => { changeTaskData("status", e.target.value) }} defaultValue={taskModified?.status} >
							<option value="To do">To do</option>
							<option value="Doing">Doing</option>
							<option value="Done">Done</option>
						</select>
					</label>
				</form>
			}
			confirmText="Salva"
			onClose={() => onClose()}
			onConfirm={() => formRef.current.requestSubmit()}
		/>
	)
}

export default EditTaskModal