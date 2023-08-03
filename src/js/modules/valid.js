export function validateForm() {
	const form = document.querySelector('.needs-validation--js');
	const submitBtn = document.querySelector('.confirm-button--js');

	if (!form) return;

	form.addEventListener('submit', function (event) {
		event.preventDefault();
		if (form.checkValidity()) {
			updateCartAfterCheckout();
			window.location.href = "thank.html";
		} else {
			event.stopPropagation();
			form.classList.add('was-validated');
		}
	});
}

function updateCartAfterCheckout() {
	const cartCountElement = document.querySelector('.buy-count--js');
	const currentCartCount = parseInt(cartCountElement.textContent) || 0;

	cartCountElement.textContent = '';
	localStorage.setItem('buyCount', '0');
	localStorage.removeItem('lastItems');
}
