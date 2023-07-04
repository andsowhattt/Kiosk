const darkModeToggle = document.getElementById('darkModeToggle');
const menuItems = document.querySelectorAll('.nav-link');

const isDarkMode = localStorage.getItem('darkMode') === 'true';

darkModeToggle.checked = isDarkMode;
setDarkMode(isDarkMode);

darkModeToggle.addEventListener('change', function () {
	const isDarkMode = darkModeToggle.checked;
	setDarkMode(isDarkMode);
	localStorage.setItem('darkMode', isDarkMode);
});

function setDarkMode(isDarkMode) {
	document.body.classList.toggle('dark-mode', isDarkMode);
	menuItems.forEach(function (menuItem) {
		menuItem.style.color = isDarkMode ? 'white' : 'black';
	});
}
