// import 'boxicons';
import './modules/toggler.js';
import { carouselSwitcher } from './modules/carousel.js';
import { productsLink, randomProductsLink, randomSaleLink, fetchProducts } from './modules/shop.js';
import { Counter } from './modules/counter.js';
import DistrictSelector from './modules/checkout.js';
import { validateForm } from './modules/valid.js';


validateForm();


document.addEventListener('DOMContentLoaded', () => {
	const districtSelector = new DistrictSelector('city', 'district', 'delivery');
});



window.addEventListener('load', () => {
	fetchProducts(productsLink, '.cards');
	fetchProducts(randomProductsLink, '.random__cards');
	fetchProducts(randomSaleLink, '.sale__cards');
});

new Counter();

carouselSwitcher();
