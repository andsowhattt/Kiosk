import './modules/switch.js';
import { carouselSwitcher } from './modules/carousel.js';
import * as shop from './modules/shop.js';
import { Counter } from './modules/counter.js';
import CheckOutForm from './modules/checkout.js';
import { validateForm } from './modules/valid.js';
import { sendMessage } from './modules/email.js';
import { renderWishlistItems } from './modules/wishlist.js';

document.addEventListener('DOMContentLoaded', () => {

	const cardsContainer = document.querySelector('.cards');
	if (cardsContainer) {
		shop.fetchProducts(shop.apiLinks.products, '.cards').then(() => shop.hideLoadingOverlay());
	}

	const randomCardsContainer = document.querySelector('.random__cards');
	if (randomCardsContainer) {
		shop.fetchProducts(shop.apiLinks.randomProducts, '.random__cards');
	}

	const saleCardsContainer = document.querySelector('.sale__cards');
	if (saleCardsContainer) {
		shop.fetchProducts(shop.apiLinks.randomSale, '.sale__cards');
	}

	validateForm();

	const checkOutForm = new CheckOutForm('city', 'district', 'delivery');

	new Counter();

	carouselSwitcher();

	const form = document.querySelector('.message-form--js');
	if (form) {
		form.addEventListener('submit', function (event) {
			event.preventDefault();
			sendMessage();
		});
	}

	const wishlistContainer = document.querySelector('.wishlist__block');
	if (wishlistContainer) {
		renderWishlistItems(wishlistContainer);
	}
});