export class Counter {
	constructor() {
		this.buyCountElement = document.getElementById('buyCount');
		this.wishlistCountElement = document.getElementById('wishlistCount');
		this.cartIcon = document.querySelector('.buy');

		this.buyCount = localStorage.getItem('buyCount') || 0;
		this.wishlistCount = localStorage.getItem('wishlistCount') || 0;

		this.updateCount(this.buyCountElement, this.buyCount, 'buyCount');
		this.updateCount(this.wishlistCountElement, this.wishlistCount, 'wishlistCount');
		this.updateLastItems();

		document.addEventListener('click', this.handleProductBuyClick.bind(this));
		document.addEventListener('click', this.handleWishlistClick.bind(this));
	}

	updateCount(element, count, key) {
		element.textContent = count > 0 ? count : '';
		localStorage.setItem(key, count);

		if (count > 0 && key === 'buyCount') {
			this.cartIcon.classList.add('fa-beat');
		} else {
			this.cartIcon.classList.remove('fa-beat');
		}
	}

	updateLastItems() {
		const lastItemsContainer = document.querySelector('.last-items-list');
		const lastItems = JSON.parse(localStorage.getItem('lastItems')) || [];

		lastItemsContainer.innerHTML = '';

		lastItems.forEach(item => {
			const div = document.createElement('div');
			div.classList.add('last-item');

			const img = document.createElement('img');
			img.src = item.image;
			img.alt = item.title;
			img.classList.add('last-item-image');
			div.appendChild(img);

			const itemDetails = document.createElement('div');
			itemDetails.classList.add('last-item-details');

			const h6 = document.createElement('h6');
			h6.textContent = item.title;
			itemDetails.appendChild(h6);

			const p = document.createElement('p');
			p.classList.add('last-item-price');
			p.textContent = item.price;
			itemDetails.appendChild(p);

			div.appendChild(itemDetails);
			lastItemsContainer.appendChild(div);
		});
	}

	handleProductBuyClick(event) {
		if (event.target.matches('.product-buy-actions .my-btn') && event.target.closest('.my-btn')) {
			this.buyCount++;
			this.updateCount(this.buyCountElement, this.buyCount, 'buyCount');

			const productTitle = event.target.closest('.card-body').querySelector('.card-title').textContent;
			const productPrice = event.target.closest('.card-body').querySelector('.card-text').textContent;
			const productImage = event.target.closest('.card').querySelector('.card-img-top').src;

			const lastItems = JSON.parse(localStorage.getItem('lastItems')) || [];

			lastItems.unshift({ title: productTitle, price: productPrice, image: productImage });

			localStorage.setItem('lastItems', JSON.stringify(lastItems));
			this.updateLastItems();
		}
	}

	handleWishlistClick(event) {
		if (event.target.matches('.product-buy-actions .btn-secondary')) {
			this.wishlistCount++;
			this.updateCount(this.wishlistCountElement, this.wishlistCount, 'wishlistCount');
		}
	}
}
