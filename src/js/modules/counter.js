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

	updateCount(buyCountElement, buyCount, 'buyCount');
	updateCount(wishlistCountElement, wishlistCount, 'wishlistCount');

	document.addEventListener('click', function (event) {
		if (event.target.matches('.product-buy-actions .my-btn') && event.target.closest('.my-btn')) {
			buyCount++;
			updateCount(buyCountElement, buyCount, 'buyCount');
		}
	});

	document.addEventListener('click', function (event) {
		if (event.target.matches('.product-buy-actions .btn-secondary')) {
			wishlistCount++;
			updateCount(wishlistCountElement, wishlistCount, 'wishlistCount');
		}
	});	
}