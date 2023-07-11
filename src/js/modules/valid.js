export function validateForm() {
	const form = document.querySelector('.needs-validation');
	const submitBtn = document.querySelector('button[type="submit"]');

	if (form) {
		form.addEventListener('submit', function (event) {
			event.preventDefault();
			if (form.checkValidity()) {
				window.location.href = "thx.html";
			} else {
				event.stopPropagation();
				form.classList.add('was-validated');
			}
		});
	}
}
