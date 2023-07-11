// import 'boxicons';
import './modules/toggler.js';
import { carouselSwitcher } from './modules/carousel.js';
import { productsLink, randomProductsLink, randomSaleLink, fetchProducts } from './modules/shop.js';
import { Counter } from './modules/counter.js';
import DistrictSelector from './modules/address.js';

document.addEventListener('DOMContentLoaded', () => {
  const districtSelector = new DistrictSelector('city', 'district', 'delivery');
});



window.addEventListener('load', () => {
	fetchProducts(productsLink, '.products');
	fetchProducts(randomProductsLink, '.random__products');
	fetchProducts(randomSaleLink, '.sale__products');
});

new Counter();

carouselSwitcher();

const form = document.querySelector('.needs-validation');
  const submitBtn = document.querySelector('button[type="submit"]');

  form.addEventListener('submit', function(event) {
    event.preventDefault();
    if (form.checkValidity()) {
      // Form is valid, proceed with submission
      window.location.href = "thx.html"; // Replace with your desired page
    } else {
      // Form is invalid, display error messages
      event.stopPropagation();
      form.classList.add('was-validated');
    }
  });
