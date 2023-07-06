export class Counter {
	constructor() {
		this.buyCountElement = document.getElementById('buyCount');
		this.wishlistCountElement = document.getElementById('wishlistCount');
		this.cartIcon = document.querySelector('.buy');

		this.buyCount = localStorage.getItem('buyCount') || 0;
		this.wishlistCount = localStorage.getItem('wishlistCount') || 0;

		this.updateCount = this.updateCount.bind(this);

		this.updateCount(this.buyCountElement, this.buyCount, 'buyCount');
		this.updateCount(this.wishlistCountElement, this.wishlistCount, 'wishlistCount');
		this.updateLastItems();

		document.addEventListener('click', this.handleProductBuyClick.bind(this));
		document.addEventListener('click', this.handleWishlistClick.bind(this));
		document.addEventListener('click', this.handleQuantityClick.bind(this));
		document.addEventListener('click', this.handleRemoveItemClick.bind(this));
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

		lastItems.forEach((item, index) => {
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

			const price = parseFloat(item.price.replace('$', ''));

			const quantityWrapper = document.createElement('div');
			quantityWrapper.classList.add('quantity-wrapper');

			const minusIcon = document.createElement('i');
			minusIcon.classList.add('fa-solid', 'fa-circle-minus', 'quantity-icon');
			quantityWrapper.appendChild(minusIcon);

			const quantity = document.createElement('span');
			quantity.classList.add('quantity');
			quantity.textContent = '1'; 
			quantityWrapper.appendChild(quantity);

			const plusIcon = document.createElement('i');
			plusIcon.classList.add('fa-solid', 'fa-circle-plus', 'quantity-icon');
			quantityWrapper.appendChild(plusIcon);

			const removeIcon = document.createElement('i');
			removeIcon.classList.add('fa-sharp', 'fa-solid', 'fa-trash', 'remove-icon');
			quantityWrapper.appendChild(removeIcon);

			itemDetails.appendChild(quantityWrapper);

			const totalPrice = document.createElement('span');
			totalPrice.classList.add('total-price');
			totalPrice.textContent = `$${price}`;
			itemDetails.appendChild(totalPrice);

			div.appendChild(itemDetails);
			lastItemsContainer.appendChild(div);

			div.setAttribute('data-index', index);
		});

		// Оновлення лічильника buyCount після оновлення списку останніх товарів
		this.buyCount = lastItems.length;
		this.updateCount(this.buyCountElement, this.buyCount, 'buyCount');
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

	handleQuantityClick(event) {
		if (event.target.classList.contains('fa-circle-plus')) {
			const quantityElement = event.target.parentNode.querySelector('.quantity');
			const quantity = parseInt(quantityElement.textContent);
			quantityElement.textContent = quantity + 1;

			const priceElement = event.target.parentNode.parentNode.querySelector('.total-price');
			const price = parseFloat(priceElement.textContent.replace('$', ''));
			const initialPrice = price / quantity;
			priceElement.textContent = `$${initialPrice * (quantity + 1)}`;
		} else if (event.target.classList.contains('fa-circle-minus')) {
			const quantityElement = event.target.parentNode.querySelector('.quantity');
			const quantity = parseInt(quantityElement.textContent);
			if (quantity > 1) {
				quantityElement.textContent = quantity - 1;

				const priceElement = event.target.parentNode.parentNode.querySelector('.total-price');
				const price = parseFloat(priceElement.textContent.replace('$', ''));
				const initialPrice = price / quantity;
				priceElement.textContent = `$${initialPrice * (quantity - 1)}`;
			}
		}
	}

	handleRemoveItemClick(event) {
		if (event.target.classList.contains('remove-icon')) {
			const itemIndex = event.target.closest('.last-item').getAttribute('data-index');
			const lastItems = JSON.parse(localStorage.getItem('lastItems')) || [];

			lastItems.splice(itemIndex, 1);
			localStorage.setItem('lastItems', JSON.stringify(lastItems));
			this.updateLastItems();
		}
	}
}
