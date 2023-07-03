const productsLink = 'https://api.escuelajs.co/api/v1/products';
const randomProductsLink = 'https://api.escuelajs.co/api/v1/products?offset=0&limit=3';
const randomSaleLink = 'https://api.escuelajs.co/api/v1/products?offset=0&limit=6';

const fetchProducts = async (link, containerClass) => {
	try {
		const result = await fetch(link);
		const data = await result.json();
		renderProducts(data, containerClass);
	} catch (error) {
		console.log('Error fetching data:', error);
	}
};

function renderProducts(products, containerClass) {
	const container = document.querySelector(containerClass);

	products.forEach((product) => {
		const card = document.createElement('div');
		card.classList.add('card-col');

		card.innerHTML = `
      <div class="card">
			<img class="card-img-top" src="${product.images}" alt="${product.title}">
				<div class="card-body">
					<h5 class="card-title">${product.title}</h5>
					<p class="card-text">$${product.price}</p>
						<div class="product-actions">
							<div class="product-buy-actions">
								<a href="#" class="btn my-btn"><i class="fas fa-shopping-cart enlarged-icon"></i>Buy</a>
								<a href="#" class="btn btn-secondary"><i class="fas fa-heart enlarged-icon"></i>Wishlist this</a>
							</div>
							<div class="products-details">
								<a href="#" class="btn btn-dark">View Details</a>
							</div>
						</div>
				</div>
      </div>`;

		container.appendChild(card);
	});
}

fetchProducts(productsLink, '.products');
fetchProducts(randomProductsLink, '.random__products');
fetchProducts(randomSaleLink, '.sale__products');





document.getElementById('darkModeToggle').addEventListener('change', function () {
	document.body.classList.toggle('dark-mode');
	let menuItems = document.querySelectorAll('.nav-link');
	if (document.body.classList.contains('dark-mode')) {
		menuItems.forEach(function (menuItem) {
			menuItem.style.color = 'white';
		});
	} else {
		menuItems.forEach(function (menuItem) {
			menuItem.style.color = 'black'; // Встановіть бажаний колір для світлого режиму
		});
	}
});

$(document).ready(function () {
	$(".carousel__prev").click(function () {
		$(".carousel").carousel("prev");
	});

	// Обробник кліку на наступну стрілку
	$(".carousel__next").click(function () {
		$(".carousel").carousel("next");
	});
});