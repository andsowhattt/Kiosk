export async function sendMessage(form) {
	const formData = new FormData(form);

	try {
		const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
			method: 'POST',
			body: formData,
		});

		if (!response.ok) {
			throw new Error('Error: ' + response.status);
		}

		const data = await response.json();

		console.log('Message sent successfully:', data);
		form.reset();

		const formDataObject = Object.fromEntries(formData.entries());

		alert(JSON.stringify(formDataObject));
		alert('Message sent successfully');

		return data;
	} catch (error) {
		console.error('Error:', error);
	}
}

export function initEmailForm() {
	const form = document.querySelector('.message-form--js');
	if (form) {
		form.addEventListener('submit', async function (event) {
			event.preventDefault();
			await sendMessage(form);
		});
	}
}
