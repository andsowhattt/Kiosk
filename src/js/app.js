// import 'boxicons';
import './modules/toggler.js';
import { carouselSwitcher } from './modules/carousel.js';
import { productsLink, randomProductsLink, randomSaleLink, fetchProducts } from './modules/shop.js';
import { Counter } from './modules/counter.js';
import DistrictSelector from './modules/address.js';

document.addEventListener('DOMContentLoaded', () => {
	const districtSelector = new DistrictSelector('city', 'district');
 });
 

window.addEventListener('load', () => {
	fetchProducts(productsLink, '.products');
	fetchProducts(randomProductsLink, '.random__products');
	fetchProducts(randomSaleLink, '.sale__products');
});

new Counter();

carouselSwitcher();

