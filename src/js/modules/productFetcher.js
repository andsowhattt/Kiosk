import * as loader from './loader.js';
import * as shop from './shop.js';
import * as api from '../const/api.js';

export function fetchAllProducts() {
	const cardsContainer = document.querySelector('.cards');
	if (cardsContainer) {
		shop.fetchProducts(api.apiLinks.products, '.cards').then(() => loader.hideLoadingOverlay());
	}

	const randomCardsContainer = document.querySelector('.random__cards');
	if (randomCardsContainer) {
		shop.fetchProducts(api.apiLinks.randomProducts, '.random__cards');
	}

	const saleCardsContainer = document.querySelector('.sale__cards');
	if (saleCardsContainer) {
		shop.fetchProducts(api.apiLinks.randomSale, '.sale__cards');
	}
}
