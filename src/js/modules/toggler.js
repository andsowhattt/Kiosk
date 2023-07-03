export function toggleColor() {
	document.body.classList.toggle('dark-mode');
	let menuItems = document.querySelectorAll('.nav-link');
	if (document.body.classList.contains('dark-mode')) {
		menuItems.forEach(function (menuItem) {
			menuItem.style.color = 'white';
		});
	} else {
		menuItems.forEach(function (menuItem) {
			menuItem.style.color = 'black';
		});
	}
}