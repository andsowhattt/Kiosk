export function validateForm() {
	const form = document.querySelector('.needs-validation');
	const submitBtn = document.querySelector('button[type="submit"]');

	if (form) {
		form.addEventListener('submit', function (event) {
			event.preventDefault();
			if (form.checkValidity()) {
				// Виклик функції для оновлення іконки корзини після підтвердження замовлення
				updateCartAfterCheckout();

				window.location.href = "thx.html";
			} else {
				event.stopPropagation();
				form.classList.add('was-validated');
			}
		});
	}
}

function updateCartAfterCheckout() {
	const cartCountElement = document.getElementById('buyCount');
	const currentCartCount = parseInt(cartCountElement.textContent) || 0;

	// Оновити цифру на іконці корзини
	cartCountElement.textContent = '';

	// Зберегти оновлену кількість товарів у локальне сховище
	localStorage.setItem('buyCount', '0');

	// Очистити вміст корзини у локальному сховищі
	localStorage.removeItem('lastItems');
}
