export class Counter {
	constructor() {
		const {
			buyCount,
			wishlistCount,
			cartIcon,
			cartItemList,
			checkoutButton,
			buyCountElement,
			wishlistCountElement,
		} = this.getItems();

		this.buyCount = parseInt(localStorage.getItem('buyCount')) || 0;
		this.wishlistCount = parseInt(localStorage.getItem('wishlistCount')) || 0;

		this.buyCountElement = buyCountElement;
		this.wishlistCountElement = wishlistCountElement;
		this.cartIcon = cartIcon;
		this.cartItemList = cartItemList;
		this.checkoutButton = checkoutButton;

		this.updateCount = this.updateCount.bind(this);
		this.cartIcon.addEventListener('click', this.handleCartClose.bind(this));
		this.checkoutButton.addEventListener('click', this.handleCheckoutClick.bind(this));

	}

	getItems() {
		return {
			buyCount: parseInt(localStorage.getItem('buyCount')) || 0,
			wishlistCount: parseInt(localStorage.getItem('wishlistCount')) || 0,
			cartIcon: document.querySelector('.buy-modal--js'),
			cartItemList: document.querySelector('.order-products--js'),
			checkoutButton: document.querySelector('.checkout-button--js'),
			buyCountElement: document.querySelector('.buy-count--js'),
			wishlistCountElement: document.querySelector('.wishlist-count--js'),
		};
	}

	init() {
		this.updateCount(this.buyCountElement, this.buyCount, 'buyCount');
		this.updateCount(this.wishlistCountElement, this.wishlistCount, 'wishlistCount');
		this.updateLastItems();

		document.addEventListener('click', (event) => {
			this.handleProductBuyClick(event);
			this.handleWishlistClick(event);
			this.handleQuantityClick(event);
			this.handleRemoveItemClick(event);
			this.handleAddButtonClick(event);
		});
	}

	updateCount(element, count, key) {
		element.textContent = count > 0 ? count : '';
		localStorage.setItem(key, count);

		if (count > 0 && key === 'buyCount') {
			this.cartIcon.classList.add('fa-beat');
		} else {
			this.cartIcon.classList.remove('fa-beat');
		}

		if (key === 'buyCount') {
			this.updateTotalPrice();
		}

	}

	updateTotalPrice() {
		const totalElement = document.querySelector('.total-price--js');
		const promoTotalElement = document.querySelector('.promo-total--js');

		const totalPrice = this.calculateTotalPrice();
		totalElement.textContent = `$${totalPrice}`;

		if (promoTotalElement) {
			const totalWithDiscount = (parseFloat(totalPrice) - 5).toFixed(2);
			promoTotalElement.textContent = `$${totalWithDiscount}`;
		}
	}


	calculateTotalPrice() {
		const totalPriceElements = document.querySelectorAll('.total-price');
		let totalPrice = 0;

		totalPriceElements.forEach(element => {
			const price = parseFloat(element.textContent.replace('$', ''));
			totalPrice += price;
		});

		return totalPrice.toFixed(2);
	}

	updateCartInformation() {
		this.updateCount(this.buyCountElement, this.buyCount, 'buyCount');
		this.updateLastItems();
	}

	updateLastItems() {
		const lastItemsContainer = document.querySelector('.last-items--js');
		const cartItemList = document.querySelector('.order-products--js');
		const copyCartCount = document.querySelector('.copy-count--js');
		const copyTotalElement = document.querySelector('.copy-cost--js');

		document.addEventListener('click', event => {
			if (event.target.classList.contains('fa-circle-plus') || event.target.classList.contains('fa-circle-minus')) {
				const itemIndex = event.target.closest('.last-item').getAttribute('data-index');
				const lastItems = JSON.parse(localStorage.getItem('lastItems')) || [];
				lastItems[itemIndex].quantity = parseInt(event.target.parentNode.querySelector('.quantity').textContent);
				localStorage.setItem('lastItems', JSON.stringify(lastItems));
			}
		});

		if (lastItemsContainer) {
			lastItemsContainer.innerHTML = '';

			const lastItems = JSON.parse(localStorage.getItem('lastItems')) || [];

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
				quantityWrapper.classList.add('modal-quantity-wrapper');

				const minusIcon = this.createIconElement('fa-circle-minus modal-quantity-icon');
				quantityWrapper.appendChild(minusIcon);

				const quantity = document.createElement('span');
				quantity.classList.add('quantity');
				quantity.textContent = item.quantity || '1';
				quantityWrapper.appendChild(quantity);

				const plusIcon = this.createIconElement('fa-circle-plus modal-quantity-icon');
				quantityWrapper.appendChild(plusIcon);

				const removeIcon = this.createIconElement('fa-trash modal-remove-icon');
				quantityWrapper.appendChild(removeIcon);

				itemDetails.appendChild(quantityWrapper);

				const totalPrice = document.createElement('span');
				totalPrice.classList.add('total-price');
				totalPrice.textContent = `$${price * (item.quantity || 1)}`;
				itemDetails.appendChild(totalPrice);

				div.appendChild(itemDetails);
				lastItemsContainer.appendChild(div);

				div.setAttribute('data-index', index);
			});

			if (cartItemList) {
				cartItemList.innerHTML = lastItems
					.map(
						item =>
							`<li class="list-group-item d-flex justify-content-between lh-condensed">
								<div>
									<h6 class="my-0">${item.title}</h6>
									<small class="text-muted">х<span class="copy_quantity">${item.quantity || 1}</span></small>
								</div>
								<span class="text-muted copy_price">${item.price}</span>
							</li>`
					)
					.join('');
			}

			if (copyCartCount) {
				copyCartCount.textContent = lastItems.length;
			}

			if (copyTotalElement) {
				copyTotalElement.textContent = `$${this.calculateTotalPrice()}`;
			}

			this.updateTotalPrice();
		}
	}

	handleProductBuyClick(event) {
		if (event.target.matches('.actions__btn .btn-buy--js') && event.target.closest('.btn-buy--js')) {
			this.buyCount++;
			this.updateCount(this.buyCountElement, this.buyCount, 'buyCount');

			const productTitle = event.target.closest('.card__block').querySelector('.card__block-title').textContent;
			const productPrice = event.target.closest('.card__block').querySelector('.card__block-price').textContent;
			const productImage = event.target.closest('.card').querySelector('.card__img').src;

			const lastItems = JSON.parse(localStorage.getItem('lastItems')) || [];

			lastItems.unshift({ title: productTitle, price: productPrice, image: productImage, quantity: 1 });

			localStorage.setItem('lastItems', JSON.stringify(lastItems));
			this.updateLastItems();
		}
	}

	handleAddButtonClick(event) {
		if (event.target.matches('.btn-add--js')) {
			this.buyCount++;
			this.updateCount(this.buyCountElement, this.buyCount, 'buyCount');
			this.updateLastItems();
		}
	}

	handleWishlistClick(event) {
		if (event.target.matches('.actions__btn .btn-wish--js')) {
			this.wishlistCount++;
			this.updateCount(this.wishlistCountElement, this.wishlistCount, 'wishlistCount');

			const productTitle = event.target.closest('.card__block').querySelector('.card__block-title').textContent;
			const productPrice = event.target.closest('.card__block').querySelector('.card__block-price').textContent;
			const productImage = event.target.closest('.card').querySelector('.card__img').src;

			const wishlistItems = JSON.parse(localStorage.getItem('wishlistItems')) || [];

			wishlistItems.push({ title: productTitle, price: productPrice, image: productImage });

			localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems));
		}
	}

	handleQuantityClick(event) {
		if (event.target.classList.contains('fa-circle-plus')) {
			this.handleQuantityChange(event, 1);
		} else if (event.target.classList.contains('fa-circle-minus')) {
			this.handleQuantityChange(event, -1);
		}

		this.updateCartInformation();
	}

	handleQuantityChange(event, increment) {
		const quantityElement = event.target.parentNode.querySelector('.quantity');
		const quantity = parseInt(quantityElement.textContent);
		const newQuantity = quantity + increment;

		if (newQuantity > 0) {
			quantityElement.textContent = newQuantity;

			const priceElement = event.target.parentNode.parentNode.querySelector('.total-price');
			const price = parseFloat(priceElement.textContent.replace('$', ''));
			const initialPrice = price / quantity;
			priceElement.textContent = `$${initialPrice * newQuantity}`;

			this.updateTotalPrice();

			const itemIndex = event.target.closest('.last-item').getAttribute('data-index');
			const lastItems = JSON.parse(localStorage.getItem('lastItems')) || [];
			lastItems[itemIndex].quantity = newQuantity;
			localStorage.setItem('lastItems', JSON.stringify(lastItems));

			this.buyCount = lastItems.reduce((total, item) => total + (item.quantity || 1), 0);
			this.updateCount(this.buyCountElement, this.buyCount, 'buyCount');
		}
	}

	handleCartClose() {
		this.updateLastItems();
	}

	handleRemoveItemClick(event) {
		if (event.target.classList.contains('modal-remove-icon')) {
			const itemIndex = event.target.closest('.last-item').getAttribute('data-index');
			const lastItems = JSON.parse(localStorage.getItem('lastItems')) || [];

			lastItems.splice(itemIndex, 1);
			localStorage.setItem('lastItems', JSON.stringify(lastItems));

			this.buyCount = lastItems.reduce((total, item) => total + (item.quantity || 1), 0);
			this.updateCount(this.buyCountElement, this.buyCount, 'buyCount');

			this.updateLastItems();

			if (lastItems.length === 0) {
				window.location.href = 'shop.html';
			}

			this.updateTotalPrice();
		}
	}

	handleCheckoutClick(event) {
		const lastItems = JSON.parse(localStorage.getItem('lastItems')) || [];
		if (lastItems.length === 0) {
			event.preventDefault();
			alert('The shopping cart is empty. Please add products to the cart to complete the order.');

			window.location.href = '../shop.html';
		}
	}

	createIconElement(additionalClass) {
		const icon = document.createElement('i');
		const classes = additionalClass.split(' ');
		icon.classList.add('fa-solid', 'fa-sharp', ...classes);
		return icon;
	}
}