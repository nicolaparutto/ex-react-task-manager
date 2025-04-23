import { createPortal } from "react-dom";

function Modal({
	title, //titolo della modale
	content, //contenuto principale della modale.
	show = false, //stato booleano per visualizzarla
	onClose = () => { }, //funzione per chiudere la modale
	onConfirm = () => { }, //funzione per confermare la modale
	confirmText = "Conferma"// testo del bottone di conferma (default: "Conferma")
}) {
	return show && createPortal(
		<div className="modal-container">
			<div className="modal">
				<h3>{title}</h3>
				<p>{content}</p>
				<button className="modal-btn confirm" onClick={onConfirm}>{confirmText}</button>
				<button className="modal-btn cancel" onClick={onClose}>Annulla</button>
			</div>
		</div>,
		document.body
	)
}

export default Modal