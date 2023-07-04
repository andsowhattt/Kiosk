export function initCounter() {
	const buyCountElement = document.getElementById('buyCount');
	const wishlistCountElement = document.getElementById('wishlistCount');
	const cartIcon = document.querySelector('.buy');

	let buyCount = localStorage.getItem('buyCount') || 0;
	let wishlistCount = localStorage.getItem('wishlistCount') || 0;

	function updateCount(element, count, key) {
		element.textContent = count > 0 ? count : '';
		localStorage.setItem(key, count);

		if (count > 0 && key === 'buyCount') {
			cartIcon.classList.add('fa-beat');
		} else {
			cartIcon.classList.remove('fa-beat');
		}
	}

	function updateLastItems() {
		const lastItemsList = document.querySelector('.last-items-list');
		const lastItems = JSON.parse(localStorage.getItem('lastItems')) || [];

		lastItemsList.innerHTML = '';

		lastItems.forEach(item => {
			const li = document.createElement('li');
			li.innerHTML = `
				  <div class="last-item">
						<img src="${item.image}" alt="${item.title}" class="last-item-image">
						<div class="last-item-details">
							 <h6>${item.title}</h6>
							 <p class="last-item-price">${item.price}</p>
						</div>
				  </div>
			 `;
			lastItemsList.appendChild(li);
		});
	}

	updateCount(buyCountElement, buyCount, 'buyCount');
	updateCount(wishlistCountElement, wishlistCount, 'wishlistCount');
	updateLastItems();

	document.addEventListener('click', function (event) {
		if (event.target.matches('.product-buy-actions .my-btn') && event.target.closest('.my-btn')) {
			buyCount++;
			updateCount(buyCountElement, buyCount, 'buyCount');

			const productTitle = event.target.closest('.card-body').querySelector('.card-title').textContent;
			const productPrice = event.target.closest('.card-body').querySelector('.card-text').textContent;

			const lastItems = JSON.parse(localStorage.getItem('lastItems')) || [];

			lastItems.push({ title: productTitle, price: productPrice });

			if (lastItems.length > 3) {
				lastItems.shift();
			}

			localStorage.setItem('lastItems', JSON.stringify(lastItems));
			updateLastItems();
		}
	});

	document.addEventListener('click', function (event) {
		if (event.target.matches('.product-buy-actions .btn-secondary')) {
			wishlistCount++;
			updateCount(wishlistCountElement, wishlistCount, 'wishlistCount');
		}
	});
}