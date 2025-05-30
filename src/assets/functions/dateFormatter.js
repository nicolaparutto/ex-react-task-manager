// Funzione riutilizzabile per formattare date, restituisce un oggetto {time, month, year}
function formatDateTimeLocale(isoString) {
	const date = new Date(isoString);

	const day = String(date.getDate()).padStart(2, '0');
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const year = date.getFullYear();

	const hours = String(date.getHours()).padStart(2, '0');
	const minutes = String(date.getMinutes()).padStart(2, '0');

	return {
		time: `${hours}:${minutes}`,
		month: `${day}/${month}`,
		year: `${year}`
	};
}

export default formatDateTimeLocale