export function validateForm() {
	const form = document.querySelector('.bill__form');

	if (!form) return;

	form.addEventListener('submit', function (event) {
		event.preventDefault();
		if (form.checkValidity()) {
			updateCartAfterValidite();
			window.location.href = "thank.html";
		} else {
			form.classList.add('was-validated');
		}
	});
}

function updateCartAfterValidite() {
	const cartCountElement = document.querySelector('.buy-count--js');

	cartCountElement.textContent = '';
	localStorage.setItem('buyCount', '0');
	localStorage.removeItem('lastItems');
}
