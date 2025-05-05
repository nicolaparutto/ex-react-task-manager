// React utility:
import { createPortal } from "react-dom";

function Modal({
	title, // Titolo della modale.
	content, // Contenuto principale della modale.
	show = false, // Stato booleano per visualizzarla.
	onClose = () => { }, // Funzione per chiudere la modale.
	onConfirm = () => { }, // Funzione per confermare la modale.
	confirmText = "Conferma"// Testo del bottone di conferma (default: "Conferma").
}) {
	//======================================================================
	return show && createPortal(
		<div className="modal-container">
			<div className="modal">
				<h3>{title}</h3>
				<div>{content}</div>
				<button className="modal-btn confirm" onClick={onConfirm}>{confirmText}</button>
				<button className="modal-btn cancel" onClick={onClose}>Annulla</button>
			</div>
		</div>,
		document.body
	)
}

export default Modal