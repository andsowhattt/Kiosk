import 'bootstrap';
import './modules/mode.js';
import './modules/carousel.js';
import { Counter } from './modules/counter.js';
import CheckOutForm from './modules/checkout.js';
import { validateForm } from './modules/valid.js';
import { initEmailForm } from './modules/email.js';
import { initializeWishlist } from './modules/wishlist.js';
import { fetchAllProducts } from './modules/productFetcher.js'; 
import { showAlert } from './modules/alert.js';
document.addEventListener('DOMContentLoaded', () => {
	showAlert();

	fetchAllProducts(); 

	validateForm();

	const checkOutForm = new CheckOutForm('city', 'district', 'delivery');

	const counter = new Counter();
	counter.init();

	initEmailForm();

	initializeWishlist(); 
});