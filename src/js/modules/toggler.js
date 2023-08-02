const darkModeToggle = document.querySelector('.switch__dark');
const menuItems = document.querySelectorAll('.bar__list-link');
const modalContent = document.querySelector('.modal-content--js');

const isDarkMode = localStorage.getItem('darkMode') === 'true';
setDarkMode(isDarkMode);

darkModeToggle.addEventListener('change', () => {
	const isDarkMode = darkModeToggle.checked;
	setDarkMode(isDarkMode);
	localStorage.setItem('darkMode', isDarkMode);
});

function setDarkMode(isDarkMode) {
	document.body.classList.toggle('dark-mode', isDarkMode);
	menuItems.forEach(menuItem => {
		menuItem.style.color = isDarkMode ? 'white' : 'black';
	});
	modalContent.style.color = 'black'; 
}