const darkModeToggle = document.querySelector('.switch__dark');
const bodyElement = document.body; 

const isDarkMode = localStorage.getItem('darkMode') !== 'false';
darkModeToggle.checked = isDarkMode;
setDarkMode(isDarkMode);

darkModeToggle.addEventListener('change', () => {
	const isDarkMode = darkModeToggle.checked;
	setDarkMode(isDarkMode);
	localStorage.setItem('darkMode', isDarkMode);
});

function setDarkMode(isDarkMode) {
	bodyElement.classList.toggle('dark-mode', isDarkMode);
}
