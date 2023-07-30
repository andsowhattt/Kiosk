export function validateForm() {
	const form = document.querySelector('.needs-validation');
	const submitBtn = document.querySelector('.confirm-button--js');

	if (!form) return;

	form.addEventListener('submit', function (event) {
		event.preventDefault();
		if (form.checkValidity()) {
			updateCartAfterCheckout();
			window.location.href = "thx.html";
		} else {
			event.stopPropagation();
			form.classList.add('was-validated');
		}
	});
}

function updateCartAfterCheckout() {
	const cartCountElement = document.getElementById('buyCount');
	const currentCartCount = parseInt(cartCountElement.textContent) || 0;

	cartCountElement.textContent = '';
	localStorage.setItem('buyCount', '0');
	localStorage.removeItem('lastItems');
}
