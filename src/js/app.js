import { toggleColor } from './modules/toggler.js';
import { carouselSwitcher } from './modules/carousel.js';
import { productsLink, randomProductsLink, randomSaleLink, fetchProducts } from './modules/shop.js';
import { initCounter } from './modules/counter.js';

document.getElementById('darkModeToggle').addEventListener('change', toggleColor);

carouselSwitcher();

window.addEventListener('load', () => {
	fetchProducts(productsLink, '.products');
	fetchProducts(randomProductsLink, '.random__products');
	fetchProducts(randomSaleLink, '.sale__products');
});


initCounter();
