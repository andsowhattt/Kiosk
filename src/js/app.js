import './modules/mode.js';
import { carouselSwitcher } from './modules/carousel.js';
import { Counter } from './modules/counter.js';
import CheckOutForm from './modules/checkout.js';
import { validateForm } from './modules/valid.js';
import { sendMessage, initEmailForm } from './modules/email.js';
import { renderWishlistItems } from './modules/wishlist.js';
import { fetchAllProducts } from './modules/productFetcher.js'; 

document.addEventListener('DOMContentLoaded', () => {

	fetchAllProducts(); 

	validateForm();

	const checkOutForm = new CheckOutForm('city', 'district', 'delivery');

	const counter = new Counter();
	counter.init();

	carouselSwitcher();

	initEmailForm();

	const wishlistContainer = document.querySelector('.wishlist__block');
	if (wishlistContainer) {
		renderWishlistItems(wishlistContainer);
	}
});