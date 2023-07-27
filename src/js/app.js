import './modules/toggler.js';
import { carouselSwitcher } from './modules/carousel.js';
import { productsLink, randomProductsLink, randomSaleLink, fetchProducts } from './modules/shop.js';
import { Counter } from './modules/counter.js';
import DistrictSelector from './modules/checkout.js';
import { validateForm } from './modules/valid.js';

document.addEventListener('DOMContentLoaded', () => {
  // Додати відстеження подій кліків на кнопку "BUY"
  const buyButton = document.querySelector('.btn-buy--js');
  if (buyButton) {
    buyButton.addEventListener('click', (event) => {
      // Код, який виконується при кліку на кнопку "BUY"
      // Ви можете залишити пустим, якщо не потрібно виконувати додаткові дії
    });
  }

  // Перевірка на наявність контейнера ".cards" на головній сторінці
  const cardsContainer = document.querySelector('.cards');
  if (cardsContainer) {
    fetchProducts(productsLink, '.cards');
  }

  // Перевірка на наявність контейнера ".random__cards" на сторінці каталогу
  const randomCardsContainer = document.querySelector('.random__cards');
  if (randomCardsContainer) {
    fetchProducts(randomProductsLink, '.random__cards');
  }

  // Перевірка на наявність контейнера ".sale__cards" на сторінці каталогу
  const saleCardsContainer = document.querySelector('.sale__cards');
  if (saleCardsContainer) {
    fetchProducts(randomSaleLink, '.sale__cards');
  }

  validateForm();

  const districtSelector = new DistrictSelector('city', 'district', 'delivery');

  new Counter();

  carouselSwitcher();
});
