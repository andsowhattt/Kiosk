const darkModeToggle = document.querySelector('.switch__dark');
const menuItems = document.querySelectorAll('.bar__list-link');

// Перевіряємо чи існує значення в local storage, якщо немає, то ставимо темний режим як стандартний
const isDarkMode = localStorage.getItem('darkMode') !== 'false';
darkModeToggle.checked = isDarkMode;
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
}
