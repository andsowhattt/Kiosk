export function sendMessage() {
	const form = document.querySelector('.message__form--js');
	const formData = new FormData(form);

	fetch('https://jsonplaceholder.typicode.com/posts', {
		method: 'POST',
		body: formData
	})
		.then(response => {
			if (!response.ok) {
				throw new Error('Error: ' + response.status);
			}
			return response.json();
		})
		.then(data => {
			console.log('Message sent successfully:', data);
			form.reset();

			const formDataObject = Object.fromEntries(formData.entries());

			alert(JSON.stringify(formDataObject));
			alert('Message sent successfully');
		})
		.catch(error => {
			console.error('Error:', error);
		});
}	 