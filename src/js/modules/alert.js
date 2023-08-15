export function showAlert() {
	const isAlertShown = sessionStorage.getItem('isAlertShown');

	if (!isAlertShown) {
		alert('This project is based on a free api. If products are not displayed, or custom ones are displayed with errors. Please come back later, the server will automatically clean up.');
		sessionStorage.setItem('isAlertShown', 'true');
	}
}